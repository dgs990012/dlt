/*
# Create apps table

1. New Tables
- `apps`
  - `id` (text, primary key) - 应用唯一标识
  - `name` (text, not null) - 应用名称
  - `tagline` (text) - 应用标语
  - `image_url` (text, not null) - 图片链接
  - `link_url` (text, not null) - 跳转链接
  - `created_at` (timestamp) - 创建时间

2. Security
- Enable RLS on `apps`.
- Allow anon + authenticated CRUD (公开数据，无需登录).
*/

CREATE TABLE IF NOT EXISTS apps (
  id text PRIMARY KEY,
  name text NOT NULL,
  tagline text DEFAULT '',
  image_url text NOT NULL,
  link_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE apps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_apps" ON apps;
CREATE POLICY "anon_select_apps" ON apps FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_apps" ON apps;
CREATE POLICY "anon_insert_apps" ON apps FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_apps" ON apps;
CREATE POLICY "anon_update_apps" ON apps FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_apps" ON apps;
CREATE POLICY "anon_delete_apps" ON apps FOR DELETE
  TO anon, authenticated USING (true);

-- 插入应用数据
INSERT INTO apps (id, name, tagline, image_url, link_url) VALUES
('app1', '聚鑫汇', '', 'https://pic1.imgdb.cn/item/6a1b8d64172c6dd74dd826b9.jpg', 'https://ybkvbz.tckqxx.com/app/register.php?site_id=1066&topId=27475&selfPlanId=1330'),
('app2', '戴高乐', '', 'https://pic1.imgdb.cn/item/6a16f2efcf685663461371d7.jpg', 'https://hbffbr.hcjwj.com/app/register.php?site_id=2091&topId=79040'),
('app3', '非凡娱乐', '', 'https://pic1.imgdb.cn/item/68692e6658cb8da5c89176fd.jpg', 'https://lncqc.jgqvji.com/app/register.php?site_id=1050&topId=3491763480092190&selfPlanId=798835'),
('app4', '梦想国际', '', 'https://pic1.imgdb.cn/item/69df01c6f76f4dd14b4c2858.jpg', 'https://mgokgd.jgqvji.com/app/register.php?site_id=1061&pt=08A0E1AF-96B3-A9C8-6E51-1D02FD14ABAC'),
('app5', '君临国际', '', 'https://pic1.imgdb.cn/item/695248a74b4fb88febf26626.jpg', 'https://tfajn.hcjwj.com/app/register.php?site_id=2081&topId=23647&selfPlanId=6413'),
('app6', '汇赢国际', '', 'https://pic1.imgdb.cn/item/69da7d4e757fdade5eafac10.jpg', 'https://ncgca.tprsmi.com/app/register.php?site_id=1062&topId=13593&selfPlanId=918'),
('app7', '365体育汇', '', 'https://pic1.imgdb.cn/item/6a3d3f02bb21102f81d61193.jpg', 'https://www.365t28.com:30123/entry/register/?i_code=5342640'),
('app8', 'top1体育', '', 'https://i.postimg.cc/FzGDYZpB/xin-TOP-ti-yu.jpg', 'https://bakmry.gziasti.com/app/register.php?site_id=1051&topId=457911'),
('app9', '新时代', '', 'https://i.postimg.cc/t4SjcBzw/xin-shi-dai.jpg', 'https://derear.fnbpsw.com/app/register.php?site_id=1059&topId=82351&selfPlanId=144338'),
('app10', '问鼎娱乐', '', 'https://i.postimg.cc/FR5hjNf0/wen-ding-guo-ji.webp', 'https://onkrcy.hefaship.com/app/register.php?site_id=1020&topId=21543657'),
('app11', '壹号娱乐', '', 'https://pic1.imgdb.cn/item/688c1d0e58cb8da5c8f69d21.webp', 'https://gfvgx.jgqvji.com/app/register.php?site_id=800&pt=20784FBB-9EDA-E1C7-A955-C82CA771D0F3'),
('app12', '胜天国际', '', 'https://pic1.imgdb.cn/item/6937c17f00233646958cd102.jpg', 'https://tfajn.hcjwj.com/app/register.php?site_id=1058&topId=26442&selfPlanId=1692'),
('app13', '超凡国际', '', 'https://pic1.imgdb.cn/item/68692e6558cb8da5c89176f7.jpg', 'https://pkajim.hfjcl.com/app/register.php?site_id=1032&topId=1056008'),
('app14', '东升国际', '', 'https://pic1.imgdb.cn/item/68692e6758cb8da5c89176fe.jpg', 'https://tz.wx-zxivoq2.com/app/register.php?site_id=2173&topId=1090266'),
('app15', '征途国际', '', 'https://pic1.imgdb.cn/item/68692e6658cb8da5c89176fc.jpg', 'https://pkajim.hfjcl.com/app/register.php?site_id=1031&topId=1890399'),
('app16', '巅峰国际', '', 'https://pic1.imgdb.cn/item/68692e6658cb8da5c89176f8.jpg', 'https://gfvgx.jgqvji.com/app/register.php?site_id=1030&topId=1744632'),
('app17', '龙腾国际', '', 'https://pic1.imgdb.cn/item/6a23ec2f0c24090b1026d76e.jpg', 'https://psktkx.tckqxx.com/app/register.php?site_id=1065&topId=27266&selfPlanId=896'),
('app18', 'NG南宫', '', 'https://pic1.imgdb.cn/item/689dd5ec58cb8da5c8251893.jpg', 'https://149.30.163.235:32011/#/link?allwin=BT8jp798vc163kFA9xyh2g%3D%3D'),
('app19', 'NG体育', '', 'https://pic1.imgdb.cn/item/68b3af8358cb8da5c8655b32.jpg', 'https://nvjmce.hfjcl.com/app/register.php?site_id=1019&topId=10325130'),
('app20', '保时捷', '', 'https://pic1.imgdb.cn/item/68dbfe46c5157e1a884b253c.jpg', 'https://bsjh5.agrleo.com/app/register.php?site_id=134523275&topId=82386'),
('app21', '赏金国际', '', 'https://pic1.imgdb.cn/item/688c1d0e58cb8da5c8f69d23.jpg', 'https://xjvueb.hefaship.com/app/register.php?site_id=1010&topId=3094701'),
('app22', '亿万28', '', 'https://pic1.imgdb.cn/item/68a570b358cb8da5c83d12f9.jpg', 'https://xjvueb.hefaship.com/app/register.php?site_id=1017&topId=7061046'),
('app23', '领航国际', '', 'https://pic1.imgdb.cn/item/69f4835ec16184acf99e4245.jpg', 'https://rsesra.hfjcl.com/app/register.php?site_id=1064&pt=FA9067F8-D104-5451-A6AB-960962BAB808'),
('app24', '多多28', '', 'https://pic1.imgdb.cn/item/686f644658cb8da5c899de0b.png', 'https://wlkyiy.paradisemall.net/app/register.php?site_id=1021&topId=5519693'),
('app25', '旺财28', '', 'https://pic1.imgdb.cn/item/68b3af7e58cb8da5c8655b00.png', 'https://wlkyiy.paradisemall.net/app/register.php?site_id=1012&topId=3926701')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  image_url = EXCLUDED.image_url,
  link_url = EXCLUDED.link_url;
