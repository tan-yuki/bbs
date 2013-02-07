<?php

$appRoot = '../../';
require_once $appRoot . 'vendor/autoload.php';
require_once './SlimWrapper.php';
require_once './TaskApi.php';

// application instance
$todo = new SlimWrapper($appRoot . "todo.ini");
$app = $todo->getApplication();


// ====== define routing =====

// Register to-do task API
//
// METHOD: PUT
// @param user_id      (required)
// @param description  (required)
// @param title        (required)
$app->put('/task/save/', function () use ($todo) {
	$app = $todo->getApplication();
	$req = $app->request();

	$errmsgs = TaskApi::save($req->params());
	if (empty($errmsgs)) {
		$todo->success();
		return;
	}

	$todo->fail($errmsgs);
	return;
});

// Get to-do task API
//
// METHOD: POST
// @param user_id      (required)
// @param description  (required)
// @param title        (required)
$app->get('/task/:user_id/', function ($user_id) use ($todo) {
	$app = $todo->getApplication();

	if (empty($user_id)) {
		$todo->fail("Empty user_id");
		return;
	}

	$req = $app->request();
	$tasks = TaskApi::get($user_id);
	$todo->success($tasks);
});

$app->notFound(function() use ($todo) {
	$todo->fail("Wrong url path");
	return;
});

$app->run();
