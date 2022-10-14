/*
 Navicat Premium Data Transfer

 Source Server         : cocacola
 Source Server Type    : MySQL
 Source Server Version : 50739
 Source Host           : 8.130.35.147:3306
 Source Schema         : article

 Target Server Type    : MySQL
 Target Server Version : 50739
 File Encoding         : 65001

 Date: 14/10/2022 13:39:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ar_admin
-- ----------------------------
DROP TABLE IF EXISTS `ar_admin`;
CREATE TABLE `ar_admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `pass` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `status` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态1：正常 2：冻结',
  `stage` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1：超级管理员 2：管理员',
  `last_login_time` bigint(20) NULL DEFAULT NULL,
  `last_login_location` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ar_article
-- ----------------------------
DROP TABLE IF EXISTS `ar_article`;
CREATE TABLE `ar_article`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章序列号',
  `user_id` bigint(20) NOT NULL COMMENT '用户id',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '类别',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标题',
  `main_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '主图',
  `status` tinyint(4) UNSIGNED NOT NULL DEFAULT 1,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '内容',
  `sort` tinyint(4) NOT NULL COMMENT '顶置\r\n',
  `create_time` bigint(20) NOT NULL COMMENT '创建时间',
  `update_time` bigint(20) NULL DEFAULT NULL COMMENT '修改时间',
  `like` bigint(20) UNSIGNED NULL DEFAULT 0 COMMENT '点赞',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3414 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ar_article_comments
-- ----------------------------
DROP TABLE IF EXISTS `ar_article_comments`;
CREATE TABLE `ar_article_comments`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `article_id` bigint(20) NOT NULL COMMENT '文章id',
  `user_id` bigint(20) NOT NULL COMMENT '用户id',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '内容',
  `create_time` bigint(20) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1005 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ar_article_item
-- ----------------------------
DROP TABLE IF EXISTS `ar_article_item`;
CREATE TABLE `ar_article_item`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标题',
  `parent_id` int(11) NOT NULL COMMENT '父级id',
  `heat` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '热度',
  `status` tinyint(4) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态1：正常 2：暂停',
  `sort` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序',
  `create_time` bigint(20) NOT NULL COMMENT '创建时间',
  `update_time` bigint(20) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ar_article_like
-- ----------------------------
DROP TABLE IF EXISTS `ar_article_like`;
CREATE TABLE `ar_article_like`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `article_id` int(11) NULL DEFAULT NULL COMMENT '文章id',
  `like` bigint(20) NULL DEFAULT NULL COMMENT '点赞数量',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ar_articletag
-- ----------------------------
DROP TABLE IF EXISTS `ar_articletag`;
CREATE TABLE `ar_articletag`  (
  `id` int(11) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标题',
  `create_time` bigint(20) NOT NULL COMMENT '创建时间',
  `status` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1:正常 2：冻结',
  `heat` bigint(20) NULL DEFAULT NULL COMMENT '热度',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ar_user
-- ----------------------------
DROP TABLE IF EXISTS `ar_user`;
CREATE TABLE `ar_user`  (
  `id` bigint(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名、账户',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '昵称',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `sex` tinyint(4) NULL DEFAULT NULL COMMENT '性别1：男2：女',
  `birthday` bigint(20) NULL DEFAULT NULL COMMENT '生日',
  `introduction` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '简介',
  `mail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '邮箱',
  `location` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '位置',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `status` tinyint(4) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态1：正常 2：冻结',
  `stage` tinyint(4) UNSIGNED NOT NULL DEFAULT 1 COMMENT '阶段1：仅注册',
  `create_time` bigint(20) NOT NULL COMMENT '注册时间',
  `update_time` bigint(20) NULL DEFAULT NULL COMMENT '最后修改时间',
  `last_login_time` bigint(20) NULL DEFAULT NULL COMMENT '登录时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 303 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ar_user_like
-- ----------------------------
DROP TABLE IF EXISTS `ar_user_like`;
CREATE TABLE `ar_user_like`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `user_id` bigint(20) NOT NULL COMMENT '用户id',
  `article_id` bigint(20) NOT NULL COMMENT '文章id',
  `create_time` bigint(20) NOT NULL COMMENT '点赞时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ar_user_wechat
-- ----------------------------
DROP TABLE IF EXISTS `ar_user_wechat`;
CREATE TABLE `ar_user_wechat`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` bigint(20) NULL DEFAULT NULL COMMENT '用户id',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `sex` tinyint(4) NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话',
  `openid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'openid',
  `stage` tinyint(4) UNSIGNED NOT NULL COMMENT '1:仅注册 2：获取用户信息 3:验证手机号',
  `status` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1：正常 2：冻结 3：注销',
  `create_time` bigint(20) NOT NULL COMMENT '创建时间',
  `last_login_time` bigint(20) NULL DEFAULT NULL COMMENT '最后登录时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
