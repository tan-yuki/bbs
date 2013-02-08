<?php

$appRoot = '../../';
require_once $appRoot . 'vendor/autoload.php';
require_once './SlimWrapper.php';
require_once './BBSApi.php';

// application instance
$bbs = new SlimWrapper($appRoot . "bbs.ini");
$app = $bbs->getApplication();



/**
 * Get posts API
 *
 * [API Input]
 *   thread_id:   Thread id
 */
$app->get('/bbs/post/', function () use ($bbs) {
	$app = $bbs->getApplication();
	$req = $app->request();
	$posts = BBSApi::getPostsFromThreadId($req->params('thread_id'));
	$bbs->success($posts);
});


/**
 * Get thread API
 *
 * [API Input]
 *   category_id:   Category id
 */
$app->get('/bbs/thread/', function () use ($bbs) {
	$app = $bbs->getApplication();
	$req = $app->request();

	$category_id = $req->params('category_id');
	if (empty($category_id)) {
		$bbs->fail("Not found Category id");
		return;
	}

	$threads = BBSApi::getThreadsByCategoryId($category_id);
	$bbs->success($threads);
});

/**
 * Get category API
 *
 * [API Input]
 *   (nothing)
 */
$app->get('/bbs/category/', function () use ($bbs) {
	$categories = BBSApi::getAllCategories();
	$bbs->success($categories);
});

/**
 * Save thread API
 *
 * [API Input]
 *   id:            Thread id
 *   category_id:   Category id
 *   user_id:       User id
 *   name:          Thread name
 */
$app->post('/bbs/thread/save', function () use ($bbs) {
	$app = $bbs->getApplication();
	$req = $app->request();

	$params = array(
		"id"          => $req->params('id'),
		"category_id" => $req->params('category_id'),
		"user_id"     => $req->params('user_id'),
		"name"        => $req->params('name'),
	);

	$errmsgs = BBSApi::saveThread($params);

	if (empty($errmsgs)) {
		$bbs->success();
		return;
	}

	$bbs->fail($errmsgs);
});

/**
 * Save post API
 *
 * [API Input]
 *   id:            Post id
 *   title:         Post title
 *   user_id:       User id
 *   thread_id:     Thread id
 *   contents:      Post contents
 */
$app->post('/bbs/post/save', function () use ($bbs) {
	$app = $bbs->getApplication();
	$req = $app->request();

	$params = array(
		"id"          => $req->params('id'),
		"title"       => $req->params('title'),
		"user_id"     => $req->params('user_id'),
		"thread_id"   => $req->params('thread_id'),
		"contents"    => $req->params('contents'),
	);

	$errmsgs = BBSApi::savePost($params);

	if (empty($errmsgs)) {
		$bbs->success();
		return;
	}

	$bbs->fail($errmsgs);
});

$app->notFound(function() use ($bbs) {
	$bbs->fail("Wrong url path");
	return;
});

$app->run();
