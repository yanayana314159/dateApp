::: mermaid
erDiagram
Auth ||--||Users : ""
Auth {
int user_id PK
string gmail
string password
}

Users ||--o{ Users_Lovers :""
Users ||--o{ Lovers :""
Users {
int user_id PK
string name
jsonb schedule
}

Users_Lovers ||--o{ Events:""
Events ||--|{ Stores:""
Events{
int event_id PK
int coulple_id FK
int store_id FK
timestamp event_date

}

Events ||--|{ Notify:""

Notify{
int notify_id PK
int event_id
int notify_type FK
boolean notify_done

}
Notify ||--||Notify_Type:""
Notify_Type{
int notify_type PK
str notify_progress
}

Lovers{
int lover_id 　 PK
int user_id 　 FK

}

Users_Lovers }|--|| Lovers :""
Users_Lovers{
int couiple_id PK
int user_id FK
int lover_id FK

}

Stores ||--|| Stores_Atomosphre:""
Stores ||--o{ Stores_Reviews:""
Stores{
int store_id PK
string name
int price
int atomosphre_id 　 FK
string location_zipcode
string location_city
string location_address
}

Stores_Atomosphre{
int atomosphre_id PK
string atmosphere_description

}

Stores_Reviews{
int stores_id PK
int atomosphre_id "雰囲気のレビュー"
str review "総合的なレビュー"
}

:::

<h2>Auth</h2>
認証用のテーブル

- int user_id PK
- string gmail
- string password

Gmail で認証を行なう予定．<br />
パスワードの保管方法については Supabase 側で検索する．<br />
同じ Gmail で新規登録できないようにクライアント側で制御する．

<h2>Users</h2>
ユーザー情報のテーブル

- int user_id PK
- string name（変更可）
- jsonb schedule（カレンダーから最新のデータを取得する）

ユーザーの id を主キーにする.

<h2>Users_Lovers</h2>
ユーザーと恋人を示すテーブル

多対多になる可能性を考慮して中間テーブルとなっている

- int couiple_id PK
- int user_id FK
- int lover_id FK

<h3>Usersに載っている人たちしかLoversに入らないのでここの設計へのアドバイスが欲しい</h3>
<h2>Lovers</h2>
恋人情報を作成するテーブル

- int lover_id 　 PK
- int user_id 　 FK

<h2>Stores</h2>
お店の情報をまとめたテーブル

- id（お店のユニークキー）
- string name
- int price
- int atomosphre_id 　 FK
- string location_zipcode
- string location_city
- string location_address

<h2>Stores_Atomosphre</h2>
店の雰囲気のタイプを並べたテーブル

- int atomosphre_id PK
- string atmosphere_description（雰囲気の詳細 ex.ガヤガヤ，ゆっくり，はっちゃけ...）

<h2>Stores_Reviews</h2>
店のレビューをまとめたテーブル

- int stores_id PK
- int atomosphre_id （雰囲気が正しかったどうかのレビュー）
- str review （総合的なレビュー）

<h2>Events</h2>
カップルごとにイベントをまとめたテーブル

- int event_id PK
- int coulple_id FK
- int store_id FK
- timestamp event_date

<h2>Notify</h2>
イベントごとに通知を設定するテーブル
- int notify_id PK
- int event_id
- int notify_type FK
- boolean notify_done（2人とも通知への操作が完了しているかどうかの確認）

<h2>Notify_Type</h2>
通知のタイプを示すテーブル

日時の承認 → 店の承認

2 つ以上の承認フローがあるのでこれを入れたかった．

- int notify_type PK
- str notify_progress
