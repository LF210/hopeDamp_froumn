/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50725
 Source Host           : localhost:3306
 Source Schema         : hopedamp_froumn

 Target Server Type    : MySQL
 Target Server Version : 50725
 File Encoding         : 65001

 Date: 16/03/2020 23:32:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for classify
-- ----------------------------
DROP TABLE IF EXISTS `classify`;
CREATE TABLE `classify`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `name` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of classify
-- ----------------------------
INSERT INTO `classify` VALUES (1, '前端');
INSERT INTO `classify` VALUES (2, '后端');
INSERT INTO `classify` VALUES (3, 'Android');
INSERT INTO `classify` VALUES (4, '大数据');
INSERT INTO `classify` VALUES (5, '人工智能');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '评论ID',
  `topic_id` int(11) NOT NULL COMMENT '评论对应的话题ID',
  `user_id` int(11) NOT NULL COMMENT '评论人ID',
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '评论内容',
  `create_time` datetime(0) NOT NULL COMMENT '评论时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 51 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (27, 18, 7, '<p>温某因疫情封村后，因为太无聊竟上山打野味</p><p>据传言， 该温姓男子是宿迁市传智专修学院全栈班的一名学生&nbsp;<img src=\"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3c/pcmoren_wu_org.png\" alt=\"[污]\" data-w-e=\"1\" style=\"font-size: 16px;\"><br></p>', '2020-02-17 15:34:21');
INSERT INTO `comment` VALUES (36, 29, 7, '<p><img src=\"https://ww4.sinaimg.cn/bmiddle/00719yt0ly1gbz8k5wpsnj30ku0v2jvs.jpg\">&nbsp;&nbsp;<br></p>', '2020-02-17 16:38:00');
INSERT INTO `comment` VALUES (37, 29, 7, '<p><img src=\"https://ww1.sinaimg.cn/bmiddle/9db08397ly1gbz8nynm3rj20c709nahy.jpg\">&nbsp;&nbsp;<br></p>', '2020-02-17 16:38:23');
INSERT INTO `comment` VALUES (38, 29, 7, '<p><img src=\"https://ww1.sinaimg.cn/bmiddle/9db08397ly1gbz8o1r870j20dr0feakg.jpg\">&nbsp;&nbsp;<br></p>', '2020-02-17 16:38:37');
INSERT INTO `comment` VALUES (39, 29, 7, '<p><img src=\"https://ww3.sinaimg.cn/orj360/c5a086cfly1gbzhfxqcr9j23342bcb2c.jpg\">&nbsp;&nbsp;<br></p>', '2020-02-17 16:38:58');
INSERT INTO `comment` VALUES (40, 32, 7, '<p><img src=\"https://r.sinaimg.cn/large/tc/news_ycwb_com/cfa1001c36470e896b508a9b489816b7.jpeg\" style=\"max-width:50%;\">&nbsp;&nbsp;<br></p>', '2020-02-17 16:47:13');
INSERT INTO `comment` VALUES (41, 27, 7, '<p>当你和睡相不好的人一起睡觉</p><p><img src=\"https://ww1.sinaimg.cn/orj360/a552f1e8ly1gbzcd7z4idg20bo0ewhdt.jpg\" style=\"max-width:30%;\">&nbsp;&nbsp;<br></p>', '2020-02-17 16:49:20');
INSERT INTO `comment` VALUES (45, 27, 7, '<p>哈哈哈哈<img src=\"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png\" alt=\"[坏笑]\" data-w-e=\"1\" style=\"font-size: 16px;\"></p>', '2020-02-24 19:42:51');
INSERT INTO `comment` VALUES (48, 33, 7, '<p>NB<img src=\"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/2018new_guzhang_thumb.png\" alt=\"[鼓掌]\" data-w-e=\"1\" style=\"font-size: 16px;\"></p>', '2020-03-03 15:43:38');
INSERT INTO `comment` VALUES (49, 27, 9, '<p><img src=\"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/28/2018new_han_org.png\" alt=\"[汗]\" data-w-e=\"1\">厉害<br></p>', '2020-03-07 14:47:42');
INSERT INTO `comment` VALUES (50, 27, 10, '<p>666</p>', '2020-03-07 14:58:31');

-- ----------------------------
-- Table structure for private_chat
-- ----------------------------
DROP TABLE IF EXISTS `private_chat`;
CREATE TABLE `private_chat`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '私聊记录ID',
  `room_id` int(11) UNSIGNED NOT NULL COMMENT '私聊房间ID',
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '消息内容',
  `create_time` datetime(0) NOT NULL COMMENT '消息创建时间',
  `send_user_id` int(10) UNSIGNED NOT NULL COMMENT '消息发送人ID',
  `collect_user_id` int(10) UNSIGNED NOT NULL COMMENT '消息接收人ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 136 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of private_chat
-- ----------------------------
INSERT INTO `private_chat` VALUES (1, 1, '<p>哈喽</p>', '2020-03-06 16:02:42', 7, 1);
INSERT INTO `private_chat` VALUES (2, 1, '<p>下午好</p>', '2020-03-06 16:03:04', 1, 7);
INSERT INTO `private_chat` VALUES (3, 1, '<p>可以兄弟，很秀</p>', '2020-03-06 16:03:26', 7, 1);
INSERT INTO `private_chat` VALUES (4, 1, '<p>一般一般</p>', '2020-03-06 16:04:00', 1, 7);
INSERT INTO `private_chat` VALUES (5, 1, '<p><img src=\"http://wclt-lf.oss-cn-hangzhou.aliyuncs.com/my_froumn/assassins_creed_artwork_full_hd-wallpaper-1920x1080.jpg\" style=\"max-width:30%;\"><br></p><p>加入我大兄弟会吧！</p>', '2020-03-06 17:44:24', 1, 7);
INSERT INTO `private_chat` VALUES (6, 1, '<p>66666</p>', '2020-03-06 17:47:11', 7, 1);
INSERT INTO `private_chat` VALUES (7, 1, '<p>牛逼</p>', '2020-03-06 18:28:56', 7, 1);
INSERT INTO `private_chat` VALUES (8, 1, '<p><img src=\"http://wclt-lf.oss-cn-hangzhou.aliyuncs.com/my_froumn/20200223172052.jpg\" style=\"max-width:30%;\"><br></p>', '2020-03-06 18:29:29', 7, 1);
INSERT INTO `private_chat` VALUES (9, 3, '<p>哈喽</p>', '2020-03-06 18:31:19', 7, 9);
INSERT INTO `private_chat` VALUES (10, 3, '<p>在吗</p>', '2020-03-06 18:31:56', 7, 9);
INSERT INTO `private_chat` VALUES (11, 5, '<p>???</p>', '2020-03-06 18:45:34', 9, 7);
INSERT INTO `private_chat` VALUES (12, 1, '<p>帅气<img src=\"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/33/2018new_xixi_thumb.png\" alt=\"[嘻嘻]\" data-w-e=\"1\" style=\"font-size: 16px;\"></p>', '2020-03-06 18:47:04', 1, 7);
INSERT INTO `private_chat` VALUES (13, 5, '<p>牛逼</p>', '2020-03-06 18:47:22', 1, 9);
INSERT INTO `private_chat` VALUES (14, 3, '<p>zai&nbsp;</p>', '2020-03-06 18:47:50', 9, 1);
INSERT INTO `private_chat` VALUES (15, 3, '<p>666</p>', '2020-03-06 19:04:16', 9, 7);
INSERT INTO `private_chat` VALUES (16, 6, '<p>哈喽，在吗？</p>', '2020-03-06 19:12:05', 10, 9);
INSERT INTO `private_chat` VALUES (17, 6, '<p>吃饭喽<img src=\"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/fa/2018new_chanzui_org.png\" alt=\"[馋嘴]\" data-w-e=\"1\" style=\"font-size: 16px;\"></p>', '2020-03-06 19:14:56', 9, 10);
INSERT INTO `private_chat` VALUES (18, 6, '<p>666</p>', '2020-03-06 19:15:03', 9, 10);
INSERT INTO `private_chat` VALUES (19, 5, '<p>1234</p>', '2020-03-06 19:15:10', 9, 7);
INSERT INTO `private_chat` VALUES (20, 3, '<p>6666</p>', '2020-03-06 19:15:12', 9, 1);
INSERT INTO `private_chat` VALUES (21, 6, '<p>？？？</p>', '2020-03-06 19:56:18', 9, 10);
INSERT INTO `private_chat` VALUES (22, 6, '<p><img src=\"http://wclt-lf.oss-cn-hangzhou.aliyuncs.com/my_froumn/21d7aec27d1ed21bbb5f79d0a06eddc451da3f30.jpg\" style=\"max-width:100%;\"><br></p>', '2020-03-06 20:06:34', 9, 10);
INSERT INTO `private_chat` VALUES (23, 6, '<p>BUG终于改好了！</p>', '2020-03-06 21:57:32', 10, 9);
INSERT INTO `private_chat` VALUES (24, 3, '<p>页面写完了，到socket连接了</p>', '2020-03-06 22:02:51', 7, 9);
INSERT INTO `private_chat` VALUES (25, 19, '<p>哈喽，3月7号了</p>', '2020-03-07 16:01:57', 7, 10);
INSERT INTO `private_chat` VALUES (26, 3, '<p>？？？</p>', '2020-03-07 16:37:57', 7, 9);
INSERT INTO `private_chat` VALUES (27, 3, '<p>nb</p>', '2020-03-07 16:42:39', 7, 9);
INSERT INTO `private_chat` VALUES (34, 3, '<p>???<br></p>', '2020-03-08 23:31:15', 9, 7);
INSERT INTO `private_chat` VALUES (59, 3, '<p>早上好<br></p>', '2020-03-09 08:54:36', 9, 7);
INSERT INTO `private_chat` VALUES (60, 3, '<p>你好</p>', '2020-03-09 08:55:27', 7, 9);
INSERT INTO `private_chat` VALUES (61, 3, '<p>666<br></p>', '2020-03-09 08:56:49', 9, 7);
INSERT INTO `private_chat` VALUES (66, 19, '<p>现在是3月9号咯</p>', '2020-03-09 09:03:58', 7, 10);
INSERT INTO `private_chat` VALUES (133, 3, '<p><img src=\"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a3/2018new_heixian_thumb.png\" alt=\"[黑线]\" data-w-e=\"1\"><br></p>', '2020-03-09 16:57:05', 7, 9);
INSERT INTO `private_chat` VALUES (134, 3, '<img src=\"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/1e/2018new_taikaixin_org.png\" alt=\"[太开心]\" data-w-e=\"1\">', '2020-03-09 16:57:35', 9, 7);
INSERT INTO `private_chat` VALUES (135, 3, '<p><img src=\"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8f/2018new_haha_thumb.png\" alt=\"[哈哈]\" data-w-e=\"1\"><br></p>', '2020-03-09 16:57:40', 7, 9);

-- ----------------------------
-- Table structure for private_room
-- ----------------------------
DROP TABLE IF EXISTS `private_room`;
CREATE TABLE `private_room`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '私聊房间ID',
  `user_id_A` int(11) NOT NULL COMMENT '私聊用户A的ID',
  `user_id_B` int(11) NOT NULL COMMENT '私聊用户B的ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of private_room
-- ----------------------------
INSERT INTO `private_room` VALUES (1, 7, 1);
INSERT INTO `private_room` VALUES (3, 7, 9);
INSERT INTO `private_room` VALUES (5, 9, 1);
INSERT INTO `private_room` VALUES (6, 9, 10);
INSERT INTO `private_room` VALUES (19, 7, 10);

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '记录id',
  `ip` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '登录地ip',
  `province` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '登录省份',
  `city` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '登录城市',
  `username` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '登录用户名',
  `login_time` datetime(0) NOT NULL COMMENT '登录时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for topic
-- ----------------------------
DROP TABLE IF EXISTS `topic`;
CREATE TABLE `topic`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '话题ID',
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '话题标题',
  `classify_id` int(11) NOT NULL COMMENT '话题分类',
  `author_id` int(11) NOT NULL COMMENT '话题作者',
  `create_time` datetime(0) NOT NULL COMMENT '话题创建时间',
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '话题内容',
  `comment_num` int(11) NOT NULL DEFAULT 0 COMMENT '话题评论数量',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of topic
-- ----------------------------
INSERT INTO `topic` VALUES (18, '震惊！！贵州毕节某温姓男子上山捕杀果子狸', 5, 7, '2020-02-17 15:31:26', '<p><img src=\"http://wclt-lf.oss-cn-hangzhou.aliyuncs.com/my_froumn/kaizi666.jpg\" style=\"max-width:100%;\"><br></p>', 1);
INSERT INTO `topic` VALUES (20, '武汉将必须开放的公共场所设置为扫码出入', 1, 1, '2020-02-17 16:14:48', '<p>2月16日，武汉市新冠肺炎疫情防控指挥部发布通告，称将进一步加强公共场所疫情防控工作。措施包括：市内文化、体育、旅游等公共场所暂不开放、宗教场所暂停对外开放；必须开放的公共场所实行扫码入出管理；实行零售药店购药登记制度；严格公共场所卫生管理；严格公共场所疫情处置等。&nbsp;&nbsp;<br></p><p><img src=\"https://ww3.sinaimg.cn/bmiddle/a716fd45ly1gbyzi5cnkfj20to13yn97.jpg\" style=\"max-width:100%;\"><br></p>', 0);
INSERT INTO `topic` VALUES (21, '中国治蝗全军出击', 2, 1, '2020-02-17 16:17:13', '<p>在中国肆虐了三千年的蝗灾能在几十年内被整治成现在的状态，背后其实是无数农业人的默默付出……&nbsp;&nbsp;<br></p><p><img src=\"https://ww4.sinaimg.cn/bmiddle/b8b73ba1ly1gbzdcn1vt0j20u05lbhdt.jpg\">&nbsp;&nbsp;<br></p>', 0);
INSERT INTO `topic` VALUES (22, '当父母得知你要复工后', 1, 1, '2020-02-17 16:20:08', '<p><img src=\"https://ww1.sinaimg.cn/bmiddle/6ea67c04ly1gbzgnpj4xwj20c80bzdj9.jpg\">&nbsp;&nbsp;<br></p><p><img src=\"https://ww4.sinaimg.cn/bmiddle/6ea67c04ly1gbzgnkqth3j20c80ubjwf.jpg\">&nbsp;&nbsp;<br></p><p><img src=\"https://ww1.sinaimg.cn/bmiddle/6ea67c04ly1gbzgnmvgngj20c80ufae9.jpg\">&nbsp;&nbsp;<br></p><p><img src=\"https://ww3.sinaimg.cn/bmiddle/6ea67c04ly1gbzgnseo1rj20c80xgdlt.jpg\">&nbsp;&nbsp;<br></p>', 0);
INSERT INTO `topic` VALUES (26, '钻石公主号有40名美国人确诊感染', 4, 7, '2020-02-17 16:29:16', '<p>【美国官方通报：“钻石公主”号邮轮上有40名美国人确诊感染新冠病毒】</p><p>法新社17日消息称，美国国家过敏症与传染病研究所(NIAID)主任福西16日透露，正在日本横滨港接受隔离的“钻石公主”号邮轮上有40名美国乘客确诊感染新型冠状病毒。</p><p>报道称，福西星期天接受哥伦比亚广播公司(CBS)采访时表示，已出现症状的美国人将在日本的医院接受治疗，不会随美国包机回国。“他们不会去任何地方，”他说，“他们将待在日本的医院里。”</p><p>当被问及被感染美国人的疾病严重程度时，福西说情况有所不同。“你可能被感染并且病症非常轻，但你依然可以将其(病毒)传染给其他人。”</p><p>邮轮上一名美国乘客向法新社透露，要撤回的美国公民会于当地时间星期天深夜至周一凌晨分批下船，经过一个临时海关，登上巴士前往羽田机场。</p><p>美国疾病控制与预防中心(CDC)周六宣布，美国包机将接回钻石公主号上约400名美国公民，回国后他们还须接受14天的隔离观察。</p><p>截至2月16日，停泊在日本横滨码头外的钻石公主号的累计确诊病例为355起。（环球网）</p><p><img src=\"https://ww3.sinaimg.cn/orj360/60718250ly1gbz4j876q1j20j10b97dn.jpg\">&nbsp;&nbsp;<br></p>', 0);
INSERT INTO `topic` VALUES (27, '你睡觉时的心理活动', 5, 7, '2020-02-17 16:32:51', '<p>每天睡觉时除了能想起那些遭乱事以外啥也想不起来……和我一样的请举手&nbsp;<img style=\"max-width:30%;\" src=\"https://wx2.sinaimg.cn/large/c0679ecaly1gbzck2mg2ej20dw0dw74s.jpg\" style=\"font-size: 16px;\"><span style=\"font-size: 16px;\">&nbsp;</span></p>', 4);
INSERT INTO `topic` VALUES (29, '宅家失败厨艺大赏', 1, 7, '2020-02-17 16:37:48', '<p>凉皮、炸油条、炸汤圆……你有哪些失败的厨艺可以分享给大家开心一样的，不要犹豫，发图吧！&nbsp;&nbsp;<br></p>', 4);
INSERT INTO `topic` VALUES (30, '暴雪两大IP将打造动画剧集', 1, 7, '2020-02-17 16:40:21', '<p>《守望先锋》和《暗黑破坏神》将会被打造为动画剧集！&nbsp;&nbsp;<br></p><p>其中《暗黑破坏神》、《守望先锋》系列动画由 Netflix 负责，而暗黑目前已开始前期制作。&nbsp;</p><p><img src=\"https://ww1.sinaimg.cn/orj360/61e7f4aaly1gbzdhyeb34j20u018x7d8.jpg\" style=\"font-size: 16px;\"></p>', 0);
INSERT INTO `topic` VALUES (31, '北大课题组最新研究提示：新型冠状病毒中间宿主或为水貂', 1, 7, '2020-02-17 16:44:17', '<p>新京报快讯（记者 许雯）新型冠状病毒的传染源至今未明。北京大学工学院生物医学工程系教授朱怀球团队1月24日发表的研究文章提示，蝙蝠和水貂可能是新型冠状病毒的两个潜在宿主，其中水貂可能为中间宿主。&nbsp;</p><p>上述研究文章题为“深度学习算法预测新型冠状病毒的宿主和感染性”，发表于bioRxiv预印版平台，研究使用的是基于深度学习算法开发的VHP（病毒宿主预测）方法，用以预测新型冠状病毒潜在宿主。</p><p>研究提示，与感染其他脊椎动物的冠状病毒相比，蝙蝠SARS样冠状病毒与新型冠状病毒具有更相似的感染模式。此外，通过比较所有宿主在脊椎动物上的病毒传染模式，发现水貂病毒的传染性模式更接近新型冠状病毒。</p><p>这说明，蝙蝠和水貂可能是新型冠状病毒的两个潜在宿主。</p><p>病毒感染力方面，朱怀球团队研究表明，新型冠状病毒的6个基因组都极有可能感染人类。预测结果提示，新型冠状病毒具有与严重急性呼吸综合征冠状病毒（SARS-CoV）、蝙蝠SARS样冠状病毒（Bat SARS-like CoV）和中东呼吸综合征冠状病毒（MERS-CoV）类似的感染人类的强大潜力。</p>', 0);
INSERT INTO `topic` VALUES (32, '奥（ yue ）利给！广东人民做防控，这么有个性！', 5, 7, '2020-02-17 16:45:51', '<p>你可能不知道，<br></p><p>广东人民做防控，</p><p>做得这么温暖高效。</p><p>肇庆人民是这么干的——</p><p><img src=\"https://r.sinaimg.cn/large/tc/news_ycwb_com/289c611d8f939dd68e396ef6fa1d78ff.jpeg\">&nbsp;&nbsp;<br></p>', 1);
INSERT INTO `topic` VALUES (33, '三部门发布公告：全国禁止野生动物交易', 1, 7, '2020-02-17 16:52:09', '<p>为严防新型冠状病毒感染的肺炎疫情，阻断可能的传染源和传播途径，市场监管总局、农业农村部、国家林草局决定，自本公告发布之日起至全国疫情解除期间，禁止野生动物交易活动。 一、各地饲养繁育野生动物场所实施隔离，严禁野生动物对外扩散和转运贩卖。</p><p>&nbsp;二、各地农（集）贸市场、超市、餐饮单位、电商平台等经营场所，严禁任何形式的野生动物交易活动。</p><p>&nbsp;三、社会各界发现违法违规交易野生动物的，可通过 12315 热线或平台举报。</p><p>&nbsp;四、各地各相关部门要加强检查，发现有违反本公告规定的，要依法依规严肃查处，对经营者、经营场所分别予以停业整顿、查封，涉嫌犯罪的，移送公安机关。&nbsp;</p><p>五、消费者要充分认识食用野生动物的健康风险，远离“野味”，健康饮食。 市场监管总局 农业农村部 国家林草局 2020年1月26日 （原题为《市场监管总局 农业农村部 国家林草局关于禁止野生动物交易的公告》）</p>', 1);
INSERT INTO `topic` VALUES (34, '望潮论坛正式发布啦', 1, 1, '2020-03-04 15:43:20', '<p>开发历时2星期</p>', 1);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户头像地址',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', 'admin', 'http://a3.att.hudong.com/68/61/300000839764127060614318218_950.jpg');
INSERT INTO `user` VALUES (7, '980782615', '2255678', 'http://wclt-lf.oss-cn-hangzhou.aliyuncs.com/my_froumn/QQ%E5%9B%BE%E7%89%8720190726202426.jpg');
INSERT INTO `user` VALUES (9, '3142794287', '2255678', 'http://wclt-lf.oss-cn-hangzhou.aliyuncs.com/my_froumn/travel_the_world_4-wallpaper-1920x1080.jpg');
INSERT INTO `user` VALUES (10, '13751994953', '2255678', 'http://wclt-lf.oss-cn-hangzhou.aliyuncs.com/my_froumn/wxq.jpg');

-- ----------------------------
-- Table structure for web_style
-- ----------------------------
DROP TABLE IF EXISTS `web_style`;
CREATE TABLE `web_style`  (
  `web_title` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '网页Title',
  `web_color` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '网页主色调（16进制）'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of web_style
-- ----------------------------
INSERT INTO `web_style` VALUES ('望潮论坛', '#e2e2e2');

SET FOREIGN_KEY_CHECKS = 1;
