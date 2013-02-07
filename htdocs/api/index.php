<?php

$appRoot = '../../';
require_once $appRoot . 'vendor/autoload.php';
require_once './SlimWrapper.php';
require_once './BBSApi.php';

// application instance
$bbs = new SlimWrapper($appRoot . "bbs.ini");
$app = $bbs->getApplication();



$app->get('/bbs/post/', function () use ($bbs) {
//    $app = $bbs->getApplication();
//    $req = $app->request();
//    $tasks = TaskApi::getPostsByThreadId($thread_id);
//    $bbs->success($tasks);
	$bbs->success(array(
		array(
			"id"   => 1,
			"title" => 'post1',
			"contents" => 'This is post1',
			"user" => array(
				"id" => 1,
				"name" => "tanakayuki",
				"thumbnail" => 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/369081_100001956302461_1189839344_q.jpg',
			),
			"update_date" => "2013-02-07 10:00:00",
			"create_date" => "2013-02-07 10:00:00"
		),
		array(
			"id"   => 2,
			"title" => 'post2',
			"contents" => 'This is post1',
			"user" => array(
				"id" => 1,
				"name" => "tanakayuki",
				"thumbnail" => 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/369081_100001956302461_1189839344_q.jpg',
			),
			"update_date" => "2013-02-07 10:00:00",
			"create_date" => "2013-02-07 10:00:00"
		),
		array(
			"id"   => 3,
			"title" => 'post3',
			"contents" => 'This is post3',
			"user" => array(
				"id" => 1,
				"name" => "tanakayuki",
				"thumbnail" => 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/369081_100001956302461_1189839344_q.jpg',
			),
			"update_date" => "2013-02-07 10:00:00",
			"create_date" => "2013-02-07 10:00:00"
		),
		array(
			"id"   => 4,
			"title" => 'post4',
			"contents" => 'This is post4',
			"user" => array(
				"id" => 1,
				"name" => "tanakayuki",
				"thumbnail" => 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/369081_100001956302461_1189839344_q.jpg',
			),
			"update_date" => "2013-02-07 10:00:00",
			"create_date" => "2013-02-07 10:00:00"
		),
		array(
			"id"   => 5,
			"title" => 'post5',
			"contents" => 'This is post5',
			"user" => array(
				"id" => 1,
				"name" => "tanakayuki",
				"thumbnail" => 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/369081_100001956302461_1189839344_q.jpg',
			),
			"update_date" => "2013-02-07 10:00:00",
			"create_date" => "2013-02-07 10:00:00"
		)
	));
});

$app->get('/bbs/thread/', function () use ($bbs) {
//    $app = $bbs->getApplication();
//    $req = $app->request();
//    $threads = TaskApi::getThreads();
//    $bbs->success($threads);
	$bbs->success(array(
		array(
			"id"   => 1,
			"name" => 'thread1'
		),
		array(
			"id"   => 2,
			"name" => 'thread2'
		),
		array(
			"id"   => 3,
			"name" => 'thread3'
		),
		array(
			"id"   => 4,
			"name" => 'thread4'
		),
		array(
			"id"   => 5,
			"name" => 'thread5'
		),
	));
});

$app->get('/bbs/category/', function () use ($bbs) {
//    $app = $bbs->getApplication();
//    $req = $app->request();
//    $categories = TaskApi::getCategories();
//    $bbs->success($categories);
	$bbs->success(array(
		array(
			"id"   => 1,
			"name" => 'カテゴリー1'
		),
		array(
			"id"   => 2,
			"name" => 'カテゴリー2'
		),
		array(
			"id"   => 3,
			"name" => 'カテゴリー3'
		),
	));
});

$app->notFound(function() use ($bbs) {
	$bbs->fail("Wrong url path");
	return;
});

$app->run();
