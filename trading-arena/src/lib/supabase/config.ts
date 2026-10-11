const SUPABASE_URL_ENV_NAMES = ['SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL'] as const;
const SUPABASE_ANON_KEY_ENV_NAMES = ['SUPABASE_ANON_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'] as const;

function firstEnvValue(names: readonly string[]) {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }
  return undefined;
}

function hasConfiguredUrl(value: string | undefined): value is string {
  return Boolean(value?.startsWith('http') && !value.includes('your_supabase'));
}

function hasConfiguredKey(value: string | undefined): value is string {
  return Boolean(value && !value.startsWith('your_'));
}

export function hasSupabaseConfig() {
  return Boolean(
    hasConfiguredUrl(firstEnvValue(SUPABASE_URL_ENV_NAMES)) &&
    hasConfiguredKey(firstEnvValue(SUPABASE_ANON_KEY_ENV_NAMES))
  );
}

export function getSupabaseAuthConfig() {
  const url = firstEnvValue(SUPABASE_URL_ENV_NAMES);
  const anonKey = firstEnvValue(SUPABASE_ANON_KEY_ENV_NAMES);

  if (!hasConfiguredUrl(url) || !hasConfiguredKey(anonKey)) {
    throw new Error(
      `Supabase environment variables are not configured. Set ${SUPABASE_URL_ENV_NAMES.join(' or ')} and ${SUPABASE_ANON_KEY_ENV_NAMES.join(' or ')}.`
    );
  }

  return { url, anonKey };
}

export function getSupabaseAdminConfig() {
  const { url } = getSupabaseAuthConfig();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!hasConfiguredKey(serviceRoleKey)) {
    throw new Error('Supabase admin environment variable is not configured. Set SUPABASE_SERVICE_ROLE_KEY.');
  }

  return { url, serviceRoleKey };
}
