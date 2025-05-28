create or replace function auth.handle_new_auth_user()
returns trigger as $$
begin
  insert into public.user (user_id, user_name, created_at, updated_at)
  values (new.id, new.email, now(), now());
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure auth.handle_new_auth_user();