<?php

/**
 * Wrapper for Slim class
 */
class SlimWrapper {

	const STATUS_SUCCESS = 'ok';
	const STATUS_FAILURE = 'ng';

	/**
	 * Slim application instance
	 */
	private $_app = null;

	/**
	 * Render php filepath
	 */
	private $_json_view = 'result.json.php';

	public function __construct($iniFilePath) {
		$config = parse_ini_file($iniFilePath, true);

		// load app setting
		$this->_app = new \Slim\Slim($config['slim']);

		// load db setting
		$db_setting = $config['db'];
		ORM::configure(
			$db_setting['db.vendor'] . ':' .
			'host='   . $db_setting['db.host'] . ';' .
			'dbname=' . $db_setting['db.name'] . ';' .
			'charset=utf8'
		);
		ORM::configure('username', $db_setting['db.username']);
		ORM::configure('password', $db_setting['db.password']);
	}

	public function success ($data=array()) {
		$this->_app->render($this->_json_view, array(
			'status' => self::STATUS_SUCCESS,
			'data' => $data
		));
	}

	public function fail ($message) {
		$this->_app->render($this->_json_view, array(
			'status' => self::STATUS_FAILURE,
			'message' => $message
		));
	}

	/**
	 * Return Slim application
	 */
	public function getApplication() {
		return $this->_app;
	}

}

