# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

userテーブル


|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true,index: :true|
|email|string|null: false, unique: true|
|password|string|null: false, foreign_key: true|

Association
has_many :groups,through: :group_users
has_many :messages
has_many :group_users


groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, foreign_key: true|

Association
has_many :users,through: :group_users
has_many :group_users
has_many :messages



messageテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|body  | text|      |
|image|string|       |
|time|datetime|null: false|

Association

belongs_to :user
belongs_to :groups



groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

Association
  belongs_to :group
  belongs_to :user

