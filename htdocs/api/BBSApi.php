<?php

class BBSApi {

	/**
	 * Get task list
	 *
	 * @param  int      User id
	 * @return Array    Task object list
	 */
	public static function getThreadsByUserId ($userId) {
	}

	/**
	 * Save task data
	 *
	 * @param  Array    Task data
	 * @return Array    Error messages. If success saving, return null.
	 */
	public static function save ($data) {
		// error messages
		$errmsgs = array();

		// params
		$params = array();
		$params['user_id']     = isset($data['user_id'])     ? $data['user_id']      : null;
		$params['title']       = isset($data['title'])       ? $data['title']        : null;
		$params['description'] = isset($data['description']) ? $data['description']  : null;


		if (isset($data['id'])) {
			// update
			$task = ORM::for_table('tasks')
				->where_equal('id', $data['id'])
				->find_one();

			if (! empty($params['description'])) $task->set('description', $params['description']);
			if (! empty($params['title']))       $task->set('title',       $params['title']);

		} else {
			// insert validation
			foreach($params as $key => $val) {
				if (empty($val)) {
					array_push($errmsgs, "$key is not set");
				}
			}

			if (! empty($errmsgs)) {
				return $errmsgs;
			}

			// insert
			$task = ORM::for_table('tasks')->create();
			$task->set_expr('create_date', 'NOW()');
			$task->set('description', $params['description']);
			$task->set('title',       $params['title']);
			$task->set('user_id',     $params['user_id']);
		}

		$task->set_expr('update_date', 'NOW()');
		$task->save();

		return null;
	}
}

