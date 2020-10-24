/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50731
 Source Host           : localhost:3306
 Source Schema         : hopedamp_froumn

 Target Server Type    : MySQL
 Target Server Version : 50731
 File Encoding         : 65001

 Date: 24/10/2020 18:14:22
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
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of classify
-- ----------------------------
INSERT INTO `classify` VALUES (1, '头条');
INSERT INTO `classify` VALUES (2, '搞笑');
INSERT INTO `classify` VALUES (3, '社会');
INSERT INTO `classify` VALUES (4, '时尚');
INSERT INTO `classify` VALUES (5, '体育');
INSERT INTO `classify` VALUES (6, '电竞');
INSERT INTO `classify` VALUES (7, '生活');
INSERT INTO `classify` VALUES (8, '职场');

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
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

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
  `is_seen` int(10) NOT NULL COMMENT '消息是否已查收',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 147 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of private_chat
-- ----------------------------
INSERT INTO `private_chat` VALUES (139, 21, '<p>2333<br></p>', '2020-10-24 09:28:14', 9, 7, 0);
INSERT INTO `private_chat` VALUES (140, 21, '<p>666<br></p>', '2020-10-24 09:53:04', 9, 7, 0);
INSERT INTO `private_chat` VALUES (141, 21, '<p>哈哈哈哈</p>', '2020-10-24 10:29:29', 7, 9, 1);
INSERT INTO `private_chat` VALUES (142, 21, '<p>唧唧复唧唧</p>', '2020-10-24 10:29:54', 7, 9, 1);
INSERT INTO `private_chat` VALUES (143, 22, '<p>12345<br></p>', '2020-10-24 16:18:10', 10, 7, 0);
INSERT INTO `private_chat` VALUES (144, 22, '<p>上山打老虎<br></p>', '2020-10-24 16:18:16', 10, 7, 0);
INSERT INTO `private_chat` VALUES (145, 22, '<p>54321</p>', '2020-10-24 16:18:50', 7, 10, 1);
INSERT INTO `private_chat` VALUES (146, 22, '<p>乌鸦坐飞机</p>', '2020-10-24 16:18:55', 7, 10, 1);

-- ----------------------------
-- Table structure for private_room
-- ----------------------------
DROP TABLE IF EXISTS `private_room`;
CREATE TABLE `private_room`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '私聊房间ID',
  `user_id_A` int(11) NOT NULL COMMENT '私聊用户A的ID',
  `user_id_B` int(11) NOT NULL COMMENT '私聊用户B的ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of private_room
-- ----------------------------
INSERT INTO `private_room` VALUES (21, 9, 7);
INSERT INTO `private_room` VALUES (22, 10, 7);

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
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of record
-- ----------------------------
INSERT INTO `record` VALUES (14, '112.91.122.239', '广东省', '梅州市', '3142794287', '2020-10-24 09:12:21');
INSERT INTO `record` VALUES (15, '112.91.122.239', '广东省', '梅州市', '980782615', '2020-10-24 09:12:31');
INSERT INTO `record` VALUES (16, '112.91.122.239', '广东省', '梅州市', '980782615', '2020-10-24 09:29:51');
INSERT INTO `record` VALUES (17, '112.91.122.239', '广东省', '梅州市', '980782615', '2020-10-24 09:30:14');
INSERT INTO `record` VALUES (18, '112.91.122.239', '广东省', '梅州市', '980782615', '2020-10-24 09:46:02');
INSERT INTO `record` VALUES (19, '112.91.122.239', '广东省', '梅州市', '980782615', '2020-10-24 09:47:23');
INSERT INTO `record` VALUES (20, '112.91.122.239', '广东省', '梅州市', '980782615', '2020-10-24 09:51:37');
INSERT INTO `record` VALUES (21, '112.91.122.239', '广东省', '梅州市', '980782615', '2020-10-24 10:29:06');
INSERT INTO `record` VALUES (22, '112.91.122.239', '广东省', '梅州市', '3142794287', '2020-10-24 16:17:30');
INSERT INTO `record` VALUES (23, '112.91.122.239', '广东省', '梅州市', '13751994953', '2020-10-24 16:17:47');
INSERT INTO `record` VALUES (24, '112.91.122.239', '广东省', '梅州市', '980782615', '2020-10-24 16:18:41');

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
) ENGINE = InnoDB AUTO_INCREMENT = 63 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of topic
-- ----------------------------
INSERT INTO `topic` VALUES (38, '特朗普转推″本拉登没死″，用意何在？', 1, 7, '2020-10-21 11:07:21', '<p align=\"justify\">语不惊人死不休，特朗普连发推特爆出惊天大内幕——本拉登没有死，死的是替身。</p><p align=\"justify\"><span style=\"font-size: 16px;\">当地时间13日，特朗普连续转发推特，声称美国CIA前特工艾伦·帕罗特爆料，拜登和奥巴马可能下令杀死了海豹突击队六号战队，目的是为了掩藏本拉登尚在人间的事实，同时透露本拉登现在伊朗境内。虽然特朗普随后删除该文，但因内容惊人，成功吸引了美国乃世界舆论的关注。</span><br></p><p align=\"justify\" style=\"text-align: center;\"><img src=\"https://wx2.sinaimg.cn/large/006XSbsJly4gjw1pihmn0j30gl0fkgmj.jpg\" style=\"max-width:100%;\"><span style=\"font-size: 16px;\"><br></span></p>', 0);
INSERT INTO `topic` VALUES (39, '共享充电宝被投诉：归还屡次失败，租金直接被扣光', 1, 7, '2020-10-21 11:18:47', '<p align=\"justify\">出门在外，手机电量不足，没带充电宝或者数据线怎么办？共享充电宝可以为你解燃眉之急。当前国内共享充电宝平台众多，经营模式差别不大。一般的模式为：企业将充电租赁设备投放到车站、医院、大型商场、餐厅等人流量大的地方，每台设备可插放几十个充电宝；消费者可使用手机扫描设备屏幕上的二维码交付押金，即可租借一个充电宝带走，待充电完成后在指定网点归还；消费者归还充电宝后，押金可随时退回，租金则按时间计费。<br></p><p align=\"justify\">&nbsp;</p><p align=\"justify\">今年突如其来的疫情，让整个共享充电宝行业的流量陷入了冰点。幸好疫情已得到有效控制，随着线下实体商业的恢复，共享充电宝的需求量又重新升温，据最新统计数据显示，截止今年第二季度末，上半年的共享充电宝活跃用户已经恢复到疫前的规模。</p><p align=\"justify\">&nbsp;</p><p align=\"justify\">围绕共享充电宝的新闻不断，最近几个月，有不少消费者投诉速绿充电，称归还充电宝时容易失败，且没有提醒，相当于租借没有停止，一直计时，最后被扣费。以黑猫投诉平台为例，关于速绿充电的投诉量累计已达3700多条，近期的内容多为“归还充电宝后仍在计费”“联系客服不予解决”等。</p><p align=\"justify\">&nbsp;</p><p align=\"justify\">据悉，速绿充电平台属于海南掌上能量传媒有限公司。该公司官网介绍称，公司于今年1月在海南省海口市成立，注册资金1000万元。</p><p align=\"justify\">&nbsp;</p><p img-box=\"img-box\" style=\"text-align: center;\"><img src=\"https://wx2.sinaimg.cn/large/a674d9baly4gjvyfbqhifj20j60eejvr.jpg\" style=\"max-width:50%;\"></p><p align=\"justify\"><br></p><h2 align=\"center\">归还充电宝失败，继续扣费没商量</h2><p align=\"justify\">&nbsp;</p><p align=\"justify\">《消费者报道》通过黑猫投诉平台联系了一些投诉人，重庆的陈女士是其中一位。</p><p align=\"justify\">&nbsp;</p><p align=\"justify\">陈女士称，9月11日下午，自己在一家商铺里扫码借用速绿的充电宝充电，使用了大约30分钟后归还。陈女士表示，自己经常用其它品牌的共享充电宝，一归还都会立马停止扣费，而且这次把充电宝归还至充电仓时，也听到“啪嗒”一声，&nbsp;她以为已经归还成功，便没有在意了。</p><p align=\"justify\">&nbsp;</p><p align=\"justify\">让陈女士没想到的是，两天后的下午她的手机收到了扣费通知，速绿扣了她60元的费用，相当于租借充电宝两天的封顶费用。</p><p align=\"justify\">&nbsp;</p><p align=\"justify\">陈女士想让速绿退回多扣的费用，她联系了借出速绿的商铺，拿到了速绿充电仓的照片，发现上面也没有任何快速联系客服的电话。因没法联系速绿，陈女士称自己只好上黑猫投诉平台恳请速绿退还60元。一天后，速绿客服在黑猫平台回复，称已将订单移交给技术部门进行核实，如有结果会及时跟进处理。</p><p align=\"justify\">&nbsp;</p><p img-box=\"img-box\" style=\"text-align: center;\"><img src=\"https://wx1.sinaimg.cn/large/a674d9baly4gjvyfbs1q8j20bf0c93z7.jpg\"></p><p align=\"justify\">无独有偶，林先生也有类似的经历。他告诉《消费者报道》，9月13日他在一家饮品店租借了速绿充电宝，因店铺打烊，他租借了1小时20分钟左右就归还了。林先生回忆道，当时他按照正确的方式把充电宝插进充电仓，自己还特地按了几下充电宝，确认插入无误。然而随后林先生查询发现，计时仍在继续。他当下就通过速绿小程序联系客服，结果是机器人在回复，而联系人工客服则显示系统繁忙。无奈的他又尝试了几次，未果。第二天林先生的租赁时长达到了17小时，费用合计30元。</p><p align=\"justify\">&nbsp;</p><p img-box=\"img-box\" style=\"text-align: center;\"><img src=\"https://wx2.sinaimg.cn/large/a674d9baly4gjvyfbxfp6j20fp0m2gq5.jpg\"></p><p align=\"justify\">林先生一直联系不上速绿客服解决问题，只能上黑猫投诉平台进行投诉。按照速绿的计费方式，在达到封顶值时，林先生就会被扣掉100元。所幸的是，林先生投诉后收到了速绿的退款。但他表示，速绿一直没有专人联系过他，没有对持续扣费的原因给出解释。</p><p align=\"justify\">&nbsp;</p><p align=\"justify\">北京市京师（郑州）律师事务所的欧阳一鹏律师认为，消费者将充电宝归还至充电仓，如果确认归还成功，那么消费者使用充电宝的服务即已经结束，商家无权继续计费。若因为商家机器存在bug（指系统或程序中隐藏的一些未被发现的缺陷或漏洞）,导致消费者财产损失，商家应该退还费用，承担损失。</p><p align=\"justify\">&nbsp;</p><p align=\"justify\">欧阳律师还表示，若速绿普遍存在这样归还不成功、超时计费的系统bug，是侵犯消费者权益的。《消费者权益保护法》规定，经营者应当保证在正常使用商品或者接受服务的情况下，其提供的商品或者服务应当具有的质量、性能、用途和有效期限。因此，商家在投放共享充电宝时，应当保证其充电仓系统的质量和准确度。</p><p img-box=\"img-box\" style=\"text-align: center;\"><img src=\"https://wx2.sinaimg.cn/large/a674d9baly4gjvyfbs6t1j20j60eejru.jpg\" style=\"max-width:50%;\"></p><p align=\"justify\">除了充电宝归还容易失败外，根据消费者的反映，速绿平台还存在着客服难以联系的问题，这一问题直接导致上一个问题得不到解决，让消费者无所适从。</p><p align=\"justify\">&nbsp;</p><p align=\"justify\">记者随机选择在某工作日上午11点半左右使用“速绿充电”小程序联系客服，先是由机器人回复，当记者点击转入人工服务时会显示“客服繁忙，请稍后再试”。</p><p align=\"justify\">&nbsp;</p><p img-box=\"img-box\" style=\"text-align: center;\"><img src=\"https://wx3.sinaimg.cn/large/a674d9baly4gjvyfbsj1tj20cy0s276k.jpg\"></p><p align=\"justify\"><br></p><h2 align=\"center\">共享充电宝问题频现</h2><p align=\"justify\">&nbsp;</p><p align=\"justify\">除了速绿充电外，在网上搜索不难发现，消费者反映的类似情况其实并不少见，就连小电科技、怪兽充电等一些行业内的头部企业也存在类似问题。</p><p align=\"justify\">&nbsp;</p><p align=\"justify\">截至9月27日，黑猫投诉平台数据显示，关于共享充电宝的投诉达2万条左右，除了本文提到的速绿充电外，涉及的主要品牌还有怪兽充电、小电科技、街电、咻电、来电、搜电等。</p><p align=\"justify\">&nbsp;</p><p align=\"justify\">对于速绿充电存在的问题，《消费者报道》欲给其所属的海南掌上能量传媒有限公司发采访函，询问原因及解决措施，但对方没有公开邮箱。记者又致电企业客服热线，客服表示会将采访意愿转达给相关部门，但在截稿前本刊未收到速绿相关部门的回复。</p>', 0);
INSERT INTO `topic` VALUES (40, '上海昨日无新增本地新冠肺炎确诊病例，新增境外输入2例，出院8例', 1, 7, '2020-10-21 11:22:14', '<p>&nbsp;&nbsp;&nbsp;&nbsp;上海市卫健委今早（21日）通报：10月20日0—24时，通过口岸联防联控机制，报告2例境外输入性新冠肺炎确诊病例。新增出院8例，分别来自俄罗斯3例，来自美国2例，来自埃塞俄比亚1例，来自土耳其1例，来自叙利亚1例。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;病例1为罗马尼亚籍，在罗马尼亚生活，10月18日自罗马尼亚出发，经英国转机后于10月19日抵达上海浦东国际机场，入关后即被集中隔离观察，期间出现症状。综合流行病学史、临床症状、实验室检测和影像学检查结果等，诊断为确诊病例。</p><p>　病例2为伊朗籍，在阿联酋生活，10月19日自阿联酋出发，当日抵达上海浦东国际机场，入关后即被集中隔离观察，期间出现症状。综合流行病学史、临床症状、实验室检测和影像学检查结果等，诊断为确诊病例。</p><p>　2例境外输入性确诊病例已转至定点医疗机构救治，已追踪同航班的密切接触者14人，均已落实集中隔离观察。</p><p>　10月20日0—24时，无新增本地新冠肺炎确诊病例。</p><p>　截至10月20日24时，累计报告境外输入性确诊病例755例，出院686例，在院治疗69例，无重症和危重症。现有待排查的疑似病例6例。</p><p>　截至10月20日24时，累计报告本地确诊病例342例，治愈出院335例，死亡7例。现有待排查的疑似病例0例。</p><p>　截至10月20日24时，尚在医学观察中的无症状感染者0例。</p><p style=\"text-align: center;\"><img src=\"https://r.sinaimg.cn/large/tc/img0_xinmin_cn/0308af444236d256877c3689bbb81ae3.jpeg\"></p>', 0);
INSERT INTO `topic` VALUES (41, '美国新增确诊5.5万例，累计超825万例', 1, 7, '2020-10-21 11:23:27', '<p>&nbsp;&nbsp;&nbsp;&nbsp;美国约翰斯·霍普金斯大学发布的新冠疫情最新统计数据显示，截至美东时间10月20日17时30分，美国新冠肺炎累计确诊病例为8258568例，死亡病例为220806例。较前一日同一时间相比，在过去24小时内，美国新增确诊病例55889例，新增死亡病例760例。</p><p><div style=\"text-align: center;\"><img src=\"https://r.sinaimg.cn/large/tc/img2_bjd_com_cn/65e0e1c1a33d4581d5e05f82ccd0fdbf.jpeg\" style=\"font-size: 16px; max-width: 50%;\"></div><div style=\"text-align: center;\"><span style=\"font-size: 16px;\">新华社资料图</span></div></p><p style=\"text-align: center;\">来源：央视新闻客户端</p><p style=\"text-align: center;\">流程编辑：u016</p>', 0);
INSERT INTO `topic` VALUES (43, '美股全线收涨，A股有望继续冲高', 1, 7, '2020-10-21 11:31:12', '<p align=\"justify\">短线关注指数上方的3350点压力。</p><p img-box=\"img-box\"><img src=\"https://wx1.sinaimg.cn/large/6f1f3431ly4gjwofjtfa1j20ah02ha9t.jpg\"></p><p align=\"justify\">隔夜美国三大股指集体上涨。截止收盘，道指涨113.37点，涨幅0.40%，报28308.79点；纳指涨37.61点，涨幅0.33%，报11516.49点；标普500指数涨16.20点，涨幅0.47%，报3443.12点。A50指数小幅下跌，收盘跌0.15%。从美股的走势来看，对于今天的影响是正向的。</p><p img-box=\"img-box\"><img src=\"https://wx1.sinaimg.cn/large/6f1f3431ly4gjwofjtny7j20dg06b3yc.jpg\"></p><p align=\"justify\"><b>大盘目前的位置处于一个比较敏感的位置了。昨天刚上了60日均线，一般来说这个位置是看涨的。不过指数要是不能放量的话，上方的3350位置的压力就会比较大了。到时候走到这里不能稳住，那么就要考虑逢高减仓操作了。短线操作上来说的话，建议仓位控制好。整体指数还是区间震荡的，还不到能重仓的时候。</b></p><p align=\"justify\">消息面</p><p align=\"justify\">财政部、发改委、国家能源局进一步明确风电、光伏等非水可再生能源发电补贴等事项。</p><p align=\"justify\"><b>（最近这些板块也基本都炒作过了，这些板块操作的话，需要注意风险了。）</b></p><p align=\"justify\">促进汽车限购向引导使用转变；抓紧在年底前出台鼓励外商投资产业目录、海南自贸港外资准入负面清单。</p><p align=\"justify\"><b>（消息对于汽车板块是一个利好，这个消息力度不足以让海南板块启动。）</b></p><p align=\"justify\">央企三季度净利润同比增34.5%，9月净利润创历史同期最好水平。</p><p align=\"justify\"><b>（利润增长，这是对于股市一个正向影响，能赚钱的公司当然会受到追捧。）</b></p><p align=\"justify\">钛精矿主产区矿企集体上调出厂价50-100元/吨，其中46品位10矿价格较去年同期涨超30%。</p><p align=\"justify\"><b>（对于关联的相对板块有利好的作用。不过有色整体的表现目前还是不够强，可能也只是个股的机会多一些。）</b></p>', 0);
INSERT INTO `topic` VALUES (46, '快讯！复兴的传奇酿酒厂罗斯班克宣布发布限量版30年威士忌！', 1, 7, '2020-10-21 11:36:02', '<p>在之前报道过有关罗斯班克的相关酒款拍卖情况，买拍的价值都是超乎想象。在7月份的拍卖数据中罗斯班克（Rosebank）增长超过11％。其中包括Rosebank 20yo（1981）的稀有麦芽，成交价格居然达到了2.000欧元！更想不到的是，仅在5月份价格为700欧元，然后在6月份为1.000欧元。另外罗斯班克21yo玫瑰（第3版）为1.800欧元再次出售。具有十分大的增长价值，现在复兴的酒厂后发布的威士忌是否具有更大的增长价值呢？文章【<a href=\"http://mp.weixin.qq.com/s?__biz=MzIzODUwMzk2Mw==&amp;amp;amp;mid=2247484394&amp;amp;amp;idx=1&amp;amp;amp;sn=06b215a935f3d7c02f0e4a9986431bd7&amp;amp;amp;chksm=e939129ede4e9b882d621726a2bd0c9e944c646d97735ecd7eda16dd43cfe9e328d3bd5d3f61&amp;amp;amp;scene=21#wechat_redirect\" target=\"_blank\">投资收藏 &nbsp;| 7月份威士忌拍卖市场价格创历史新高！</a>】</p><p><br></p><p>伊恩·麦克劳德（Ian Macleod Distillers）今天宣布，复兴酒厂罗斯班克将在系列年度限量版中发布第一瓶装瓶装威士忌30年，这些系列威士忌将在未来十年内全部发布。这是他们在苏格兰福尔柯克（Falkirk）旧罗斯班克酿酒厂建造复兴后的第一款威士忌。<br></p><p><br></p><p><img src=\"https://wx4.sinaimg.cn/large/0078dZRply4gjwnljqtpnj30g409dt9g.jpg\"></p><p><br></p><p>该系列中的第一款威士忌将被标记为“ Release One”，是罗斯班30年威士忌，低地德拉姆酒，1990年在酒厂关闭前3年进行了三次蒸馏，并以62％的雪利酒和38％的波旁威士忌桶混合而成。并持续陈酿了三十年。瓶装酒精度为48.6％，全球有4,350瓶，建议零售价为1,650英镑。<br></p><p><br></p><p><img src=\"https://wx1.sinaimg.cn/large/0078dZRply4gjwnljp1lej30fa0aqaad.jpg\"></p><p><br></p><p>罗斯班克（Rosebank）还为粉丝和鉴赏家提供了获得不仅仅是第一瓶稀有威士忌的机会。到2021年，前200名扫描现在最新款的 Release 1 瓶颈圈上的QR码的人将有机会在离他们最近的高端酒吧或威士忌零售商处享受Release 2的购买机会，并有机会可以在普通版本之前获得购买第二版的早期名额。（将于2021年初向这些客户发送供他们选择的参与渠道的列表。）<br></p><p><br></p><blockquote><section><section>伊恩·麦克劳德·狄斯特（Ian Macleod Distillers）集团蒸馏经理罗比·休斯（Robbie Hughes）表示：“罗斯班30年威士忌的全球首发对酿酒厂而言是一个真正的标志性时刻。几十年来，它在62％的雪利酒桶装和38％的波旁威士忌酒桶装中成熟，耐心等待被唤醒，并提供其他威士忌中找不到的令人难以置信的风味。”</section><section><br></section></section></blockquote><p><img src=\"https://wx1.sinaimg.cn/large/0078dZRply4gjwnljq5q8j30sg0fyabm.jpg\"></p><p><em><strong><br></strong></em></p><p><em><strong>官方品尝说明：</strong><br><strong>闻：&nbsp;</strong>柔软和乳脂状，带有焦糖薄片，醋栗，白葡萄，杏仁，香草，蜂蜜，柠檬和肉豆蔻。<br><strong>口感：</strong>&nbsp;精致细腻，均衡，淡淡的糖浆，洋甘菊，梨和精致的热带水果味，并带有令人愉悦的橡木香料。<br><strong>韵味：</strong>&nbsp;柔软但长的蜜饯紫罗兰，橙色和淡淡的薄荷味。</em></p><p>Rosebank 30年开始将直接从Rosebank网站购买，然后是专业的在线威士忌零售商，例如&nbsp;The Whiskey Exchange，&nbsp;The Whiskey Shop和&nbsp;Malt Master&nbsp;在这里发行。<br></p><p>官网购买链接：https://rosebank.com/our-whisky</p>', 0);
INSERT INTO `topic` VALUES (47, '段永平：内在价值', 1, 7, '2020-10-21 11:36:39', '<p align=\"justify\">1、我们之所以选择帐面价值(虽然不是所有形况皆如此)是因为它是衡量内含价值成长(这是真正重要的)的一种保守但合理的替代方式，它的好处是很容易去计算且不牵涉主观去衡量内含价值，但仍需强调这两者事实上具有截然不同的意义。<br></p><p align=\"justify\"><br></p><p align=\"justify\">帐面价值是会计名词，系记录资本与累积盈余的财务投入，内含价值则是经济名词，是估计未来现金流入的折现值，帐面价值能够告诉你已经投入的，内含价值则是预计你能从中所获得的。</p><p align=\"justify\"><br></p><p align=\"justify\">类似词能告诉你之间的不同，假设你花相同的钱供二个小孩读到大学，二个小孩的帐面价值即所花的学费是一样的，但未来所获得的回报(即内含价值)却不一而足，可能从零到所付出的好几倍，所以也有相同帐面价值的公司，却有截然不同的内含价值。</p><p align=\"justify\"><br></p><p align=\"justify\">2、公司未来现金流的折现就是公司的内在价值。买股票应该在公司股价低于其内在价值时买。至于应该是40%还是50%（安全边际）还是其他数字则完全由投资人自己的机会成本情况来决定。</p><p align=\"justify\"><br></p><p align=\"justify\">未来现金流的折现不是算法，是思维方式，不要企图拿计算器去算出来。当然，拿计算器算一下也没什么。</p><p align=\"justify\"><br></p><p align=\"justify\">不懂不做（能力圈）是一个人判断公司内在价值的必要前提（不是充分的）。</p><p align=\"justify\"><br></p><p align=\"justify\">“护城河”是用来判断公司内在价值的一个重要手段（不是唯一的）。</p><p align=\"justify\"><br></p><p align=\"justify\">企业文化是“护城河”的重要部分。很难想象一个没有很强企业文化的企业可以有个很宽的“护城河”。</p>', 0);
INSERT INTO `topic` VALUES (48, '潮南区：深化简政放权 赋能镇域经济发展', 1, 7, '2020-10-21 11:37:37', '<p align=\"justify\">10月20日上午，我区举办潮南区镇（街道）公共服务中心综合窗口人员交接仪式，这是我区区级行政职权调整由镇（街道）实施工作取得实质进展的里程碑，标志着我区各“前台综合受理，后台分类审批，统一窗口出件”的综合窗口服务模式在区镇（街道）两级实现全覆盖。</p><p align=\"justify\"><br></p><p align=\"justify\">副区长肖辉麟出席交接仪式。</p><p img-box=\"img-box\"><img src=\"https://wx3.sinaimg.cn/large/d5422a62ly4gjwnvbbuzcj20u00gwgo1.jpg\"></p><p align=\"justify\"><br></p><p align=\"justify\">阶段来，区政务服务数据管理局按照“优化流程、方便群众、服务企业、转变作风、提高效率”的工作要求，分工协作，全力推进潮南区镇（街道）公共服务中心综合窗口项目建设工作。同时，选择峡山街道、陇田镇的公共服务中心作为先行试点单位，于9月10日开始试运行。依托“1+11+N”三级联动综合政务服务体系，实行一门对外，一窗通办和受审分离的运行机制。一方面，区级下放事项全部纳入镇村两级公共服务中心统一受理，另一方面，由专业政务服务公司派员入驻窗口收件预审，由在编人员负责审批，实行“受审分离”，做到“一窗受理、合并审查、限时审批、一窗办结”，进一步优化办事流程和服务规范，有效提升政务服务质量和办事效率，极大地方便了群众和企业。接下来，全区镇（街道）11个公共服务中心，共计45个综合窗口将正式全面启动。<br></p><p img-box=\"img-box\"><img src=\"https://wx4.sinaimg.cn/large/d5422a62ly4gjwnvb9rgrj20u00gwdhs.jpg\"></p><p align=\"justify\"><br></p><p align=\"justify\">此外，为进一步推进简政放权，全面提高基层人员政策水平和办事能力，确保事权“接得住、用得好”。阶段来，区政务服务数据管理局通过举办潮南区“简政放权”镇（街道）事项承接专题培训会，邀请区司法局、区市场监管局有关人员分别就执法证件办理、市场监管局下放的事项办理流程进行讲解，为各镇（街道）有承接区直职能部门行政职权的内设机构和下属事业单位主要负责人及业务骨干进行培训，使他们对如何做好下放事项实施工作有了全面、系统的认识。</p><p img-box=\"img-box\"><img src=\"https://wx3.sinaimg.cn/large/d5422a62ly4gjwnvbe9ytj20u00gwq4y.jpg\"></p><p align=\"justify\"><br></p><p align=\"justify\">肖辉麟在仪式上要求各级各有关部门要提高认识，理解改革的重要意义，积极推进镇（街道）公共服务中心推行综合窗口服务模式，不断推动镇域经济高质量发展。要明确目标，确保改革取得实效，各部门间要密切配合，进一步做好综合窗口运行相关的配套工作，坚持依法依规、有序进行。各镇（街道）以公共服务中心“综合窗口”服务模式改革为新的起点，进一步深化改革，对赋予的新职能、新任务加强研究，明确工作重点，进一步加强政务服务工作，确保相关行政职权放得下、接得住、用得好。要各司其职，提高办事效率，进一步落实责任，明确分管领导，安排专人负责协调各部门与综合窗口工作人员的业务对接，确保区级行政职权调整由镇（街道）实施工作在实施环节“用得好”。</p><p align=\"justify\">仪式上，镇（街道）综合窗口工作人员进行了廉洁自律宣誓。<br></p><p img-box=\"img-box\"><img src=\"https://wx1.sinaimg.cn/large/d5422a62ly4gjwnvbe3r0j20u00gw764.jpg\"></p><p align=\"justify\"><b>胪岗镇综合窗口服务人员 周泽霖：</b></p><p align=\"justify\">在窗口工作中，我们始终秉承全心全意为人民服务的态度，努力为群众和企事业单位做实事，办好事。同时，要明确工作细则，牢记业务流程，保证服务的质量。</p><p align=\"justify\"><br></p><p align=\"justify\"><br></p><p align=\"justify\"><br></p><p align=\"justify\">文稿&nbsp;|&nbsp;&nbsp;芮玉儿</p><p align=\"justify\">图片&nbsp;|&nbsp;&nbsp;蔡南周</p><p align=\"justify\">编辑&nbsp;|&nbsp;&nbsp;陈宇冰&nbsp;</p>', 0);
INSERT INTO `topic` VALUES (49, '十二星座的专属秋千吊椅，双子座的清新自然，白羊座的国色天香！', 1, 7, '2020-10-21 11:38:19', '<p align=\"justify\">家中有一把秋千吊椅，闲暇时坐在上面摇啊摇，真的非常的悠闲呢。那么让我们看看十二星座的专属秋千吊椅是什么样子的吧！</p><p align=\"justify\">1、狮子座</p><p align=\"justify\">狮子座的专属秋千吊椅整体都是木材结构的，配上合适的靠枕和坐垫，既舒适又现代感十足呢！</p><p img-box=\"img-box\"><img src=\"https://r.sinaimg.cn/large/article/84772ddce8009e907e9186b3a95d6e58\"></p><p align=\"justify\">2、水瓶座</p><p align=\"justify\">水瓶座的专属秋千吊椅整体都是金属结构的，配上白色的坐垫，迎着微风，又是美好的一下午。</p><p img-box=\"img-box\"><img src=\"https://r.sinaimg.cn/large/article/efd6c2eeae3c8150b599fad2630039d2\"></p><p align=\"justify\">3、处女座</p><p align=\"justify\">处女座的专属秋千吊椅特别适合有庭院的家庭，和子女一起玩耍，共享天伦之乐呢。</p><p img-box=\"img-box\"><img src=\"https://r.sinaimg.cn/large/article/a73d3a1eaba57f3128d190bf6f532b18\"></p><p align=\"justify\">4、双鱼座</p><p align=\"justify\">双鱼座的专属秋千吊椅是藤编造型的，古色古香，给人另外一种独特的美丽，夏天坐起来也是非常的凉爽哦！</p><p img-box=\"img-box\"><img src=\"https://r.sinaimg.cn/large/article/176fc02408cfc1bda8bb5f865761880c\"></p><p align=\"justify\">5、天秤座</p><p align=\"justify\">天秤座的专属秋千吊椅适合放在不是封闭式的阳台，下午泡一杯奶茶，看看书，晒晒太阳，要多舒服就有多舒服呢！</p><p img-box=\"img-box\"><img src=\"https://r.sinaimg.cn/large/article/046d0a8477c69e7fe2aff82bdde6d5aa\"></p><p align=\"justify\">6、白羊座</p><p align=\"justify\">白羊座的专属秋千吊椅是纯白色的，给人一种童话公主风的感觉呢，吊绳上装饰着美丽的花朵，国色天香。</p><p img-box=\"img-box\"><img src=\"https://r.sinaimg.cn/large/article/14ea5de0903a76d12d32fea57bfa7a7f\"></p><p align=\"justify\">7、双子座</p><p align=\"justify\">双子座的专属秋千吊椅最大的特色是做的位置面积特别的大，特别适合情侣哦，你侬我侬呢！</p><p img-box=\"img-box\"><img src=\"https://r.sinaimg.cn/large/article/0f6a9d3c9d90f59e153c73535d21741e\"></p><p align=\"justify\">8、射手座</p><p align=\"justify\">射手座的专属秋千吊椅就是个小秋千的造型哦，和自己的子女一起玩耍，奇趣横生呢！</p><p img-box=\"img-box\"><img src=\"https://r.sinaimg.cn/large/article/3328f9c53277e58149b976d03853c202\"></p><p align=\"justify\">9、摩羯座</p><p align=\"justify\">摩羯座的专属秋千吊椅是专门为两个人设计的，一起摇啊摇，悠闲得过着你们俩的小日子吧！</p><p img-box=\"img-box\"><img src=\"https://r.sinaimg.cn/large/article/371344bf745859f143de289f6a4d1892\"></p><p align=\"justify\">10、巨蟹座</p><p align=\"justify\">巨蟹座的专属秋千吊椅有点波西米亚风格哦，七彩的颜色，麻绳的材质，你喜欢吗？</p><p img-box=\"img-box\"><img src=\"https://r.sinaimg.cn/large/article/90058d43ca17225558a8b1b65e7c1387\"></p><p align=\"justify\">11、天蝎座</p><p align=\"justify\">天蝎座的专属秋千吊椅是皮革材质的，时尚感十足，这款吊椅重点强调的是舒适性和趣味性哦。</p><p img-box=\"img-box\"><img src=\"https://r.sinaimg.cn/large/article/d6c344f490161bdbabc719abe6cc3ab9\"></p><p align=\"justify\">12、金牛座</p><p align=\"justify\">金牛座的专属秋千吊椅是翠绿色的，配上顶棚，特别适合户外哦，鸟语花香处，妙趣横生来。</p><p img-box=\"img-box\"><img src=\"https://r.sinaimg.cn/large/article/ede29263cdec2ae0a3954f6df1c36a7f\"></p><p align=\"justify\">你们最喜欢哪个星座的专属秋千吊椅呢？赶快多多的评论收藏转发吧，爱你们！</p>', 0);
INSERT INTO `topic` VALUES (50, '“五克高速公路”10月30日前主线通车', 1, 7, '2020-10-21 11:40:30', '<p align=\"justify\">　　天山网讯（记者郭玲&nbsp;通讯员房华摄影报道）目前，省道20五工台至克拉玛依（简称“五克高速公路”）一级改高速公路主线建设工程已进入质量检测阶段，10月30日前，该路段主线将全部通车。</p><p align=\"justify\">　　记者了解到，五克高速公路就是大家比较熟知的呼克公路（呼图壁至克拉玛依公路）“加长版”，全长206.692公里，其控制点为乌鲁木齐、五工台、克拉玛依。原有的道路为一级公路，原有路线有48个平面交叉路口，路口进出的农用车辆较多，交通情况复杂，且全程限速100、80、60公里/小时不等，全程下来历时3个小时。</p><p align=\"justify\">　　道路改建后，设计时速100公里，原有交叉路口改为立体交叉，采用全封闭通行方式，乌鲁木齐往来克拉玛依节约时间近1个小时。</p><p img-box=\"img-box\"><img src=\"https://wx2.sinaimg.cn/large/006a7coZly4gjw472o3pxj30dw0afjt9.jpg\"></p><p align=\"justify\">工作人员正在进行公路标线检测。</p><p align=\"justify\">　　省道20五工台至克拉玛依一级改高速公路项目指挥长芦欣介绍，五克高速公路主线通车后，剩余工程辅道、跨线立交附属、服务区等工程，计划于明年完工，届时克拉玛依至乌鲁木齐将提前一年半工期实现全程高速。</p><p align=\"justify\">　　需要注意的是，由于项目部分天桥引道工程未完，部分路口无法封闭，提醒社会车辆以及沿线居民群众，在该条公路上行驶时，一定要严格按照沿线设置限速标志、警示标志要求安全驾驶。</p><p align=\"justify\">　　五克高速公路新建路段长19.392公里，改建路段长187.3公里，辅道长141.785公里，“在道路升级全封闭高速公路后，为满足沿线居民生产生活需求及沿线社会车辆上下高速的需求，在全线合理新修辅道。”芦欣说，改建后的路段全线设置9座互通立交、48座分离式立交，方便了沿线群众出行需求。</p><p img-box=\"img-box\"><img src=\"https://wx3.sinaimg.cn/large/006a7coZly4gjw473s4l7j30dw07tmya.jpg\"></p><p align=\"justify\">五克高速公路。</p><p align=\"justify\">　　芦欣介绍，项目的建成通车可有效与沿线既有国家高速公路网、普通国省道网进行衔接，通过连接乌鲁木齐都市圈，连接克拉玛依市，通过国、省道路连接石河子、五家渠、塔城、昌吉等中心城市，有利于构建天山北坡国家级城镇化地区，便利了沿线县市、兵团的交通出行，为经济社会发展提供保障。</p><p align=\"justify\">　　此外，项目的建成将有利于强化公路与多种运输方式及其枢纽的良好衔接，进一步拓展了运输枢纽的服务范围，发挥枢纽城市的辐射带动作用，提高综合运输效率。</p>', 0);
INSERT INTO `topic` VALUES (51, '罗永浩出走后，头条张一鸣是怎样调教锤子团队做新手机R2的？', 1, 7, '2020-10-21 11:42:01', '<div>罗永浩从未离开锤子团队，他用另一种身份活在锤子手机里，想和你交个朋友，纯商务的那种</div><div node-type=\"contentBody\"><p align=\"justify\">老罗卖手机公司去抖音还债的前情提要咱们一次说完，只说现象和个人看法。</p><p align=\"justify\"><br></p><p img-box=\"img-box\"><img src=\"https://wx4.sinaimg.cn/large/3e2e0860gy1gjwiroq5qhj20qo0b60u1.jpg\"></p><p align=\"justify\"><font color=\"#000000\">这次更新的功能都是奔着商务办公去的，对锤粉的用户画像已经非常清晰，锤子系统很清楚:什么拍照游戏，咱不染指了，你们去拍月亮和跑分吧，哥几个就在老罗当年那三分地里玩，还要玩出花来。</font><br></p><p img-box=\"img-box\"><img src=\"https://wx1.sinaimg.cn/large/3e2e0860gy1gjwisiq1nxj20qo0cwq3h.jpg\"></p><p align=\"justify\"><font color=\"#000000\">这次自杀涨价的目的显然是奔着老用户升级(收割)去的，比如移动办公，大爆炸、时间胶囊、一步、TNT包括屏幕键盘等硬件的补丁式进化还在用力认真地做生产力差异化细分，至少我是没有发现同类安卓手机可以比肩的。</font><br></p><p img-box=\"img-box\"><img src=\"https://wx4.sinaimg.cn/large/3e2e0860gy1gjwisw11q2j20j6088t8w.jpg\"></p><p align=\"justify\"><br><font color=\"#000000\">不过实话实说，整体学习成本还是有点高，要重新教育客户来一起改变世界太难，运气和线下营销策略从来就不是锤子的强项。</font></p><p img-box=\"img-box\"><img src=\"https://wx2.sinaimg.cn/large/3e2e0860gy1gjwjh425ruj20go0b474d.jpg\"></p><p align=\"justify\"><br><font color=\"#000000\">你可以说这群理工男就是在开发手机给自己用的，这份倔强和螺丝壳里做道场的精神我还是挺看好的，头条系大数据反馈和长期挨骂应该让他们知道自己想要什么，个人感觉他们在做谷歌\\微软手机想做，但是至今还没做好的事情。</font><br></p><p img-box=\"img-box\"><img src=\"https://wx2.sinaimg.cn/large/3e2e0860gy1gjwjfecx5nj20dw08i3yp.jpg\"></p><p align=\"justify\"><br><font color=\"#000000\">张一鸣下的这盘罗永浩抖音卖货+锤子手机卖系统软件送手机的大棋慢慢浮出水面，头条营销号们应该连夜开始办事了。还是那句话，罗总，咱们下次一定。</font></p></div>', 0);
INSERT INTO `topic` VALUES (52, '《心经》中的“行深般若波罗密多”的“多”是什么意思？', 1, 7, '2020-10-21 11:43:02', '<h2>《心经》中的“行深般若波罗密多”的“多”是什么意思？</h2><p align=\"justify\">讲到多字，那么多呢是定，前面讲了的，定有八定。总之一句称为如如不动，于有相上也是如如不动，定一个东西，不分别也是如如不动，平等观照，也叫定。梵语谓之三昧，又云三摩。此指多者呢，乃是观音菩萨从闻思修果入三摩地之圆通大定。就是说啊，观音菩萨，在修法当中，从闻来的、思来的、具体去修的，所证到的果当中，入进了三摩地的圆通大定，这是最圆满彻底的一种定境。</p><p align=\"justify\">完整法义详见《藉心经说真谛》p196</p><p img-box=\"img-box\"><img src=\"https://wx1.sinaimg.cn/large/0086kR7bgy1gjvenwxuhcj30m80gqabp.jpg\"></p>', 0);
INSERT INTO `topic` VALUES (53, '柴桑区大气污染防治指挥部办公室召开工作例会', 1, 7, '2020-10-21 11:43:31', '<p align=\"justify\">&nbsp;&nbsp;10月20日上午，九江市柴桑区大气污染防治指挥部办公室主任吴珊珊主持召开指挥部办公室例会，部署安排近期大气污染防治工作。区大气污染防治指挥部办公室成员、大气巡查专班全体成员、驻点技术团队参加了会议。</p><p img-box=\"img-box\"><img src=\"https://wx3.sinaimg.cn/large/005H32kDgy1gjw3c7n4j0j312w0pxu0x.jpg\"></p><p align=\"justify\">&nbsp; &nbsp; &nbsp; &nbsp;会议听取了大气专班、监测站和技术团队近期工作情况汇报，分析研判了秋冬季大气污染防治工作形式，并就下步攻坚工作进行了部署安排。</p><p img-box=\"img-box\"><img src=\"https://wx2.sinaimg.cn/large/005H32kDgy1gjw3d0di3yj30m80et15f.jpg\"></p><p align=\"justify\">&nbsp; &nbsp; &nbsp; &nbsp;会议指出，在区委、区政府的坚强领导下，全区上下全力推进大气污染防治工作，全区空气质量较去年同期改善明显，但如需完成全年大气考核目标任务，还需持续抓好秋冬季大气污染防治工作，科学有效应对污染天气。</p><p align=\"justify\">&nbsp; &nbsp; &nbsp; &nbsp; 会议要求，一要做细做实工作，大气专班要强化巡查管控，扩大巡查覆盖面，加大秋冬季巡查督查，确保问题及时发现、及时整改到位。二要规范监督管理。督促工业企业、餐饮企业、建筑工地建立设施运行台账，规范污染治理设施运行，提升污染防治效果。三要科学防治污染。要充分运用走航、无人机、污染检测设备等技术手段，强化污染源溯源和排放监管，特别要加强重点污染源监管，提升科学防治水平。四要开展专项行动。指挥部办公室要抓住近期工作重点，开展餐饮油烟和机动车尾气整治两个专项行动，助力秋冬季污染防治。五要科学研判分析。专家团队要结合周边空气质量状况、气象情况大数据，科学研判分析污染天气情况，提前做好准备、及时发布预警，科学有效应对秋冬季污染天气。六要加大环保宣传。要通过开展环保大讲堂、大气知识培训等形式，提高企业和群众保护蓝天的环保意识，共同助力蓝天保卫战。</p>', 0);
INSERT INTO `topic` VALUES (54, '不放肉也好吃的素炒豇豆，越嚼越香，我家每做必光盘，特下饭', 1, 7, '2020-10-21 11:44:14', '<p img-box=\"img-box\"><br><img src=\"https://wx1.sinaimg.cn/large/6e88f1ffly4gjw99ag8t1j20m80eu78a.jpg\"></p><p align=\"justify\">不放肉也好吃的素炒豇豆，越嚼越香，我家每做必光盘，特下饭</p><p align=\"justify\">炒豇豆时加点它，味道不比放肉差，口感香嫩，炒一盘不过四块钱</p><p align=\"justify\">&nbsp;不知道中年的女性朋友有没有跟我一样的感觉。随着年龄的增长，对肉的狂热没有之前那么强烈了，有时眼馋肚饱，看着肉挺喜欢，以为自己能吃上一盘，结果一两块就开始觉得油腻，失去了兴趣。这估计跟身体的代谢有关，代谢变慢，对肉类的渴求程度也没有之前那么强烈了，反而把兴趣开始转了一个些味道清淡的素食。</p><p img-box=\"img-box\"><img src=\"https://wx1.sinaimg.cn/large/6e88f1ffly4gjw99alalxj20m80eujub.jpg\"></p><p align=\"justify\">今天我就与大家分享一道不放肉的素食。这道菜，只用两块干豆腐，一把豇豆，一大勺自制的剁酱就可以，成本最多有四块钱，却非常的下饭。既有微辣的口感，又有蒜香味，虽不放肉，却因为放了炒的豆干而越嚼越香。豆腐外韧内软，配上切成细段的豇豆，这盘菜必须得用勺挖着大口吃才过瘾。我家每做必光盘，您也快来试试吧！</p><p img-box=\"img-box\"><img src=\"https://wx3.sinaimg.cn/large/6e88f1ffly4gjw99afqzzj20m80eutby.jpg\"></p><p align=\"justify\">所用食材：</p><p align=\"justify\">干豆腐2块 豇豆1小把 自制剁椒1大勺 盐少许</p><p align=\"justify\">具体做法：</p><p img-box=\"img-box\"><img src=\"https://wx4.sinaimg.cn/large/6e88f1ffly4gjw99aedo2j20m80ergo7.jpg\"></p><p align=\"justify\">1准备干豆腐，我们当地这种干豆腐卖五块钱四块，可以切成丝做汤或者炒着吃，也可以煎着卤着吃，口感非常的筋道。</p><p img-box=\"img-box\"><img src=\"https://wx3.sinaimg.cn/large/6e88f1ffly4gjw99afifhj20m80ergov.jpg\"></p><p align=\"justify\">2将干豆腐切成小丁，大约1厘米的小方形就可以。</p><p img-box=\"img-box\"><img src=\"https://wx3.sinaimg.cn/large/6e88f1ffly4gjw99aeqysj20m80er0vx.jpg\"></p><p align=\"justify\">3豇豆切成小段备用。</p><p img-box=\"img-box\"><img src=\"https://wx1.sinaimg.cn/large/6e88f1ffly4gjw99ad0rnj20m80ern0l.jpg\"></p><p align=\"justify\">4锅中放入适量的油，先把干豆腐放入，中小火，慢慢晃动炒勺，使其表面呈焦黄的色后盛出装盘。这一步尽量用平底不粘锅，一来受热面积大，二来不粘锅可以用很少油就能达到不粘的效果，吃起来更健康。</p><p img-box=\"img-box\"><img src=\"https://wx2.sinaimg.cn/large/6e88f1ffly4gjw99adh53j20m80et77y.jpg\"></p><p align=\"justify\">5利用锅中底油，将豇豆放入锅中煸炒。</p><p img-box=\"img-box\"><img src=\"https://wx4.sinaimg.cn/large/6e88f1ffly4gjw99adlyvj20m80erjuv.jpg\"></p><p align=\"justify\">6炒至豇豆变成翠绿色，加入剁椒同炒。我自制的剁椒味道不咸，蒜香味重，微辣，还有花椒的味道，用来做菜当调料非常的不错。</p><p img-box=\"img-box\"><img src=\"https://wx1.sinaimg.cn/large/6e88f1ffly4gjw99af5o8j20m80etq6p.jpg\"></p><p align=\"justify\">7感觉豇豆差不多炒熟后，加入之前煎好的豆丁同炒，炒匀即可出锅，如果感到味道淡，可以加入适量的盐调味。</p><p img-box=\"img-box\"><img src=\"https://wx1.sinaimg.cn/large/6e88f1ffly4gjw99aexjsj20m80eugpj.jpg\"></p><p align=\"justify\">接下来，美美地享用吧！</p><p align=\"justify\">今天的分享您喜欢吗？我是苹果小厨，一个孩子的妈妈，除了每天工作，还每天下厨。如果您喜欢我的分享，可以关注我，点赞，收藏。如果您有什么建议，也欢迎留言，我与您共同学习探讨。我每天持续更新，好吃的，好喝的，家常菜，烘焙，宴客菜等等，您不知道三餐做什么，吃什么，就到我这里看一看！</p>', 0);
INSERT INTO `topic` VALUES (56, '考研英语第240讲', 1, 7, '2020-10-21 11:49:29', '<p align=\"justify\">If you see a shop or&nbsp;<b><u>stall</u></b>&nbsp;offering to paint black&nbsp;<b><u>tattoo</u></b>s onto your skin, don’t be&nbsp;<b><u>tempt</u></b>ed to get one, and it could leave you&nbsp;<b><u>scar</u></b>red for life and put you at risk of a life-threatening&nbsp;<b><u>allergic</u></b>&nbsp;<b><u>reaction</u></b>.</p><p align=\"justify\">1.&nbsp;stall1 [stɔ:l]&nbsp;n.马厩，牛棚；商品台，售货摊，柜台</p><p align=\"justify\">【考点提醒】能有一丁点印象即可，此处or表并列，可以猜测。</p><p align=\"justify\">2.&nbsp;tattoo [tæ\'tuː] n. 文身v. 做纹身</p><p align=\"justify\">【考点提醒】阅读性词汇，能在阅读辨识即可。</p><p align=\"justify\">3.&nbsp;tempt [tempt]&nbsp;vt.引诱，诱惑；诱导，使发生兴趣</p><p align=\"justify\">【同根派生】temptation [temp\'teiʃən]&nbsp;n.引诱，诱惑</p><p align=\"justify\">【近义词】induce 诱导，引导，但是注意：tempt多表示 “诱导”做坏事，而induce则是中性词。</p><p align=\"justify\">【常用短语】resist the temptation 抵制诱惑，抵挡住诱惑</p><p align=\"justify\">4.&nbsp;scar [skɑ:]n.疤，伤痕，瘢痕；创伤，伤痕</p><p align=\"justify\">【考点提醒】该词偶尔也会作动词，但词义不变。</p><p align=\"justify\">5.&nbsp;allergic [ə\'lɜːdʒɪk] adj. 对…过敏的，对…极讨厌的</p><p align=\"justify\">【考点提醒】能在阅读识别即可，非核心词汇。</p><p align=\"justify\">6.&nbsp;reaction [ri\'ækʃən; ri:-]&nbsp;n.反应，感应</p><p align=\"justify\">【同根派生】react [rɪ\'ækt] vi. 反应，影响，相互影响</p><p align=\"justify\">If you see a shop or stall offering to paint black tattoos onto your skin, don’t be tempted to get one, and it could leave you scarred for life and put you at risk of a life-threatening allergic reaction.</p><p align=\"justify\">【句式结构】if 引出一个条件状语从句，don’t是一个省略you的祈使句，and it could…和don’t 这一句并列。</p><p align=\"justify\">【参考译文】 如果在商店或者路边摊看到能做黑色纹身，千万别尝试。这种纹身存在使人终身过敏的威胁，非常可怕。</p>', 0);
INSERT INTO `topic` VALUES (57, '缺铁性贫血', 1, 7, '2020-10-21 11:49:48', '<p align=\"justify\">1.铁代谢特点：食物中的铁以三价铁为主，需要还原为二价铁，在十二指肠及空肠上段吸收，吸收入血的二价铁氧化为三价铁，与转铁蛋白结合形成血清铁，运送至组织、细胞还原成二价铁后参与形成血红蛋白；未吸收入血的二价铁在肠黏膜细胞内氧化为三价铁后，与去铁铁蛋白结合，最后随粪便排出。多余的铁以铁蛋白和含铁血黄素的形式贮存于单核巨噬细胞系统。</p><p align=\"justify\">2.缺铁性贫血的病因：①需铁量增加而铁摄入不足：婴幼儿、青少年、妊娠和哺乳期妇女；②铁吸收障碍：胃大部分切除术、胃肠道功能紊乱（长期腹泻、慢性肠炎、克罗恩病等）；③铁丢失过多：慢性胃肠道失血（痔疮、胃十二指肠溃疡等）、女性月经过多、咯血、血红蛋白尿等。</p><p align=\"justify\">3.缺铁性贫血的发病机制由于原料铁的缺乏，导致血红素和血红蛋白合成障碍。</p><p align=\"justify\">4.缺铁性贫血的表现：原发病表现：腹痛、黒便、便血、妇女月经过多、消瘦等；贫血表现：苍白、乏力、头晕、心率增快；组织缺铁的表现：①精神行为异常，如烦躁、易怒、注意力不集中、异食癖；②体力、耐力下降；③易感染；④儿童生长发育迟缓、智力低下；⑤口腔炎、舌炎、舌乳头萎缩、口角皲裂、吞咽困难（Plummer-Vinson综合征）；⑥毛发干枯、脱落；皮肤干燥、皱缩；⑦指（趾）甲缺乏光泽、脆薄易裂，重者指（趾）甲变平，甚至凹下呈勺状（匙状甲）。</p><p align=\"justify\">5.缺铁性贫血的实验室检查：铁蛋白（SF)减低，血清铁（SI)和转铁蛋白饱和度(TS)减低，总铁结合力（TIBC)、未结合铁的转铁蛋白（UIBC)、血清转铁蛋白（TF)升高，可溶性转铁蛋白受体（sTfIR）浓度升高，游离原卟啉（FEP)、锌原卟啉（ZPP)升高；网织红细胞计数多正常或轻度增高；骨髓涂片：骨髓细胞外铁减少，骨髓有核红细胞内铁减少，铁粒幼细胞减少。</p><p align=\"justify\">6.铁粒幼细胞性贫血的检査指标：血清铁蛋白增高、骨髓小粒含铁血黄素颗粒（骨髓内、外铁）增多、铁粒幼细胞增多、血清铁和转铁蛋白饱和度增高，总铁结合力不低。慢性炎症贫血的检査指标：贮存铁（血清铁蛋白和骨髓内、外铁）增多、铁粒幼细胞数降低、血清铁、转铁蛋白饱和度、总铁结合力减低。</p><p align=\"justify\">7.骨髓有核红细胞出现“核老浆幼”现象的是缺铁性贫血，骨髓有核红细胞出现“核幼浆老”现象的是巨幼细胞贫血。</p><p align=\"justify\">8.缺铁性贫血常用实验室检査：血常规、骨髓细胞学检査、血清铁、铁蛋白测定、粪便隐血试验、胃肠道X线、消化道内镜、妇科检査等。</p><p align=\"justify\">9.缺铁性贫血血液中最先下降的是血清铁蛋白，缺铁性贫血诊断最可靠的依据是血红蛋白及骨髓贮存铁均减少；治疗缺铁性贫血的最后目标是血红蛋白恢复正常及补足骨髓贮存铁。</p><p align=\"justify\">10.促进铁吸收的因素：鱼、肉类、维生素C(促进三价铁还原为二价铁）等；抑制铁吸收的因素：进食谷类、乳类、茶、咖啡等。注意：八版生理学P215认为稀盐酸（胃酸）促进铁的吸收。</p><p align=\"justify\">11.缺铁性贫血分为：①缺铁性贫血潜伏期：血清铁蛋白减少、骨髓小粒可染铁消失、铁粒幼细胞减少（贮存铁消耗），余指标尚正常；②红细胞内铁缺乏期：贮存铁消耗、转铁蛋白饱和度降低、游离原卟啉升高，血红蛋白尚正常；③缺铁性贫血期：贮存铁消耗、转铁蛋白饱和度降低、游离原卟啉升高、血红蛋白减少（小细胞低色素性贫血）。</p><p align=\"justify\">12.缺铁性贫血的诊断要点：消化性溃疡、肿瘤、痔疮、妇女月经过多等病因；缺铁性贫血的表现：①乏力、心慌、头晕、苍白（贫血表现）；②异食癖、体力、耐力下降、口腔炎、舌炎、舌乳头萎缩、吞咽困难、皮肤毛发改变、匙状甲（反甲）（组织缺铁表现）；实验室检査：男性Hb＜120g/L，女性Hb＜110g/L，孕妇Hb＜100g/L，MCV＜80fl，MCH＜27pg，MCHC＜32%，粪便隐血阳性，铁代谢指标异常（铁蛋白、血清铁减少、总铁结合力增加等）。</p><p align=\"justify\">13.缺铁性贫血应用铁注射剂注意事项：精确计算铁剂总剂量，深部肌肉注射，首次注射前给予0.5ml的试验剂量，以免发生过敏性休克，1小时后无过敏反应可给予足量治疗。</p><p align=\"justify\">14.肉类、蛋类、动物肝脏含有较多铁，乳类含铁量较少，且抑制铁的吸收。</p><p align=\"justify\">15.缺铁性贫血的治疗：首选口服铁剂，不能耐受或胃肠道解剖异常者才考虑注射铁治疗。口服铁剂包括无机铁和有机铁两类，无机铁以硫酸亚铁为代表，有机铁包括右旋糖酐铁、葡萄糖酸亚铁、山梨醇铁、富马酸亚铁、琥珀酸亚铁和多糖铁复合物等，无机铁剂的不良反应较有机铁剂明显。</p><p align=\"justify\">16.口服铁剂有效的表现先是外周血网织红细胞增多，高蜂在开始服药后5～10天，2周后血红蛋白浓度上升，一般2个月左右恢复正常。铁剂治疗应在血红蛋白恢复正常后至少持续4～6个月，待铁蛋白正常后停药。</p>', 0);
INSERT INTO `topic` VALUES (58, '#文字是可以产生痛觉的# 画面感太足了', 2, 7, '2020-10-21 11:51:28', '<p><img src=\"https://wx1.sinaimg.cn/mw690/0069btCyly1gjvujsj4z8j30pn0l6gmn.jpg\">&nbsp;&nbsp;<br></p>', 0);
INSERT INTO `topic` VALUES (59, '全世界都在说早安打工人，可是谁又关心过上学人呢', 2, 7, '2020-10-21 11:54:28', '<p style=\"text-align: left;\"><img src=\"https://wx4.sinaimg.cn/mw690/006GJQvhly1gjvizdbdptj31rl1rlav3.jpg\" style=\"max-width:30%;\">&nbsp;&nbsp;<img src=\"https://wx2.sinaimg.cn/mw690/006GJQvhly1gjviz7poj4j328g28g4qp.jpg\" style=\"font-size:16px; max-width:30%;\"><img src=\"https://wx4.sinaimg.cn/mw690/006GJQvhly1gjviz8es2aj328g28ghdt.jpg\" style=\"font-size:16px; max-width:30%;\"><br></p><p style=\"text-align: left;\"><img src=\"https://wx1.sinaimg.cn/mw690/006GJQvhly1gjvk8epq4lj328g28gx12.jpg\" style=\"max-width:30%;\">&nbsp;&nbsp;<img src=\"https://wx2.sinaimg.cn/mw690/006GJQvhly1gjvizah5pfj328g28g7wh.jpg\" style=\"font-size:16px; max-width:30%;\"><img src=\"https://wx2.sinaimg.cn/mw690/006GJQvhly1gjviz9o4x3j31rl1rl1kx.jpg\" style=\"font-size:16px; max-width:30%;\"><br></p><p style=\"text-align: left;\"><img src=\"https://wx4.sinaimg.cn/mw690/006GJQvhly1gjvizb8t3wj328g28g1kx.jpg\" style=\"max-width:30%;\">&nbsp;&nbsp;<img src=\"https://wx1.sinaimg.cn/mw690/006GJQvhly1gjvizdyv0mj328g28g1kx.jpg\" style=\"font-size:16px; max-width:30%;\"><img src=\"https://wx2.sinaimg.cn/mw690/006GJQvhly1gjvizcpepaj328g28g4qp.jpg\" style=\"font-size:16px; max-width:30%;\"><br></p>', 0);
INSERT INTO `topic` VALUES (60, '孩砸，你经历过绝望嘛！最后一个，笑得我停不下来。', 2, 7, '2020-10-21 12:00:06', '<p><video id=\"Gif_ekpmv_160325259580386260_html5_api\" class=\"wbv-tech\" tabindex=\"-1\" autoplay=\"\" muted=\"muted\" src=\"//g.us.sinaimg.cn/001MsYGflx07vmyLX5Hi010412000olJ0E010.mp4?label=gif_mp4&amp;template=420x236.28.0&amp;Expires=1603256157&amp;ssig=osDMsRQaNB&amp;KID=unistore,video\" loop=\"loop\"></video></p><p><video id=\"Gif_ekpmv_160325259580386260_html5_api\" class=\"wbv-tech\" tabindex=\"-1\" autoplay=\"\" muted=\"muted\" src=\"//g.us.sinaimg.cn/004xdRHJlx07vmyLW1mo010412000dCu0E010.mp4?label=gif_mp4&amp;template=250x152.28.0&amp;Expires=1603256157&amp;ssig=PZ10%2Fes1p9&amp;KID=unistore,video\" loop=\"loop\"></video></p><p><video id=\"Gif_ekpmv_160325259580386260_html5_api\" class=\"wbv-tech\" tabindex=\"-1\" autoplay=\"\" muted=\"muted\" src=\"//g.us.sinaimg.cn/000BR9Gxlx07vmyLWRoc010412000lAb0E010.mp4?label=gif_mp4&amp;template=350x194.28.0&amp;Expires=1603256157&amp;ssig=4W4FoN9aZ5&amp;KID=unistore,video\" loop=\"loop\"></video></p><p><video id=\"Gif_ekpmv_160325259580386260_html5_api\" class=\"wbv-tech\" tabindex=\"-1\" autoplay=\"\" muted=\"muted\" src=\"//g.us.sinaimg.cn/000jpsjolx07vmyLXBaU010412000bXP0E010.mp4?label=gif_mp4&amp;template=384x318.28.0&amp;Expires=1603256157&amp;ssig=y21B5PDDSf&amp;KID=unistore,video\" loop=\"loop\"></video></p><p><video id=\"Gif_ekpmv_160325259580386260_html5_api\" class=\"wbv-tech\" tabindex=\"-1\" autoplay=\"\" muted=\"muted\" src=\"//g.us.sinaimg.cn/000txq6Alx07vmyM6ElG010412000hIy0E010.mp4?label=gif_mp4&amp;template=400x264.28.0&amp;Expires=1603256157&amp;ssig=iHvhxHca6O&amp;KID=unistore,video\" loop=\"loop\"></video></p><p><video id=\"Gif_ekpmv_160325259580386260_html5_api\" class=\"wbv-tech\" tabindex=\"-1\" autoplay=\"\" muted=\"muted\" src=\"//g.us.sinaimg.cn/003W0XULlx07vmyM7jBm010412000Mp70E010.mp4?label=gif_mp4&amp;template=196x134.28.0&amp;Expires=1603256157&amp;ssig=1VFdaT0MGm&amp;KID=unistore,video\" loop=\"loop\"></video></p><p><video id=\"Gif_ekpmv_160325259580386260_html5_api\" class=\"wbv-tech\" tabindex=\"-1\" autoplay=\"\" muted=\"muted\" src=\"//g.us.sinaimg.cn/000Z8QiAlx07vmyM6Jyg010412000kUa0E010.mp4?label=gif_mp4&amp;template=340x182.28.0&amp;Expires=1603256157&amp;ssig=ufQBNHzojX&amp;KID=unistore,video\" loop=\"loop\"></video></p><p><br></p>', 0);
INSERT INTO `topic` VALUES (61, '解锁带娃新技能', 2, 7, '2020-10-21 12:02:12', '<p><img src=\"https://wx2.sinaimg.cn/mw690/007uhGMbgy1gjmd7twslwg306e06hkjn.gif\">&nbsp;&nbsp;<br></p>', 0);
INSERT INTO `topic` VALUES (62, '每日一笑 - 10/21', 2, 7, '2020-10-21 12:04:00', '<p><img src=\"https://wx2.sinaimg.cn/mw690/8df9f00dgy1gjuzp9lm3ij20n043c4gm.jpg\">&nbsp;&nbsp;<br></p>', 0);

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
