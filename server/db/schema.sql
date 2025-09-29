create table if not exists users (
  id bigint generated always as identity primary key,
  username text not null,
  email text not null unique,
  created_at timestamp with time zone default now()
);

create table if not exists products (
  id bigint generated always as identity primary key,
  name text not null,
  price numeric(12,2) not null,
  category text,
  user_id bigint references users(id) on delete set null
);

create table if not exists orders (
  id bigint generated always as identity primary key,
  user_id bigint references users(id) on delete cascade,
  total numeric(12,2) not null,
  created_at timestamp with time zone default now()
);

create table if not exists posts (
  id bigint generated always as identity primary key,
  title text not null,
  content text,
  created_at timestamp with time zone default now()
);



