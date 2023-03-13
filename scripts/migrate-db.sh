#!/bin/sh

migrate() {
  npx prisma migrate deploy
}

seed() {
  npx prisma db seed
}

drop_and_create() {
  cd ../auth

  if [ "$1" = "drop" ];
  then
    echo '=========Drop db========='
    npx prisma migrate reset --force
  fi

  echo '=========Create db========='
  npx prisma migrate deploy
}

migrate_component() {
  echo "=========Migration $1 Component========="
  cd ./$1
  migrate
  seed
  cd ..
}

cd ../src
drop_and_create $1

migrate_component "user"
migrate_component "product"

