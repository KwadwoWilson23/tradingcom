-- Run this after replacing the email below with your real admin email.
-- This locks admin privileges to one email and keeps every other profile non-admin.

create or replace function public.is_wilson_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and is_admin = true
      and lower(email) = lower('REPLACE_WITH_YOUR_ADMIN_EMAIL@example.com')
  );
$$;

create or replace function public.enforce_single_admin_email()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  allowed_admin_email text := lower('REPLACE_WITH_YOUR_ADMIN_EMAIL@example.com');
begin
  if lower(new.email) = allowed_admin_email then
    new.is_admin := true;
  else
    new.is_admin := false;
  end if;

  return new;
end;
$$;

drop trigger if exists enforce_single_admin_email_on_profiles on public.profiles;
create trigger enforce_single_admin_email_on_profiles
before insert or update of email, is_admin on public.profiles
for each row
execute function public.enforce_single_admin_email();

update public.profiles
set is_admin = (lower(email) = lower('REPLACE_WITH_YOUR_ADMIN_EMAIL@example.com'));

create unique index if not exists profiles_single_admin_true_idx
on public.profiles ((is_admin))
where is_admin = true;

drop policy if exists "Admins can insert competitions" on public.competitions;
create policy "Admins can insert competitions" on public.competitions
  for insert with check (public.is_wilson_admin());

drop policy if exists "Admins can update competitions" on public.competitions;
create policy "Admins can update competitions" on public.competitions
  for update using (public.is_wilson_admin());

drop policy if exists "Admins can delete competitions" on public.competitions;
create policy "Admins can delete competitions" on public.competitions
  for delete using (public.is_wilson_admin());
