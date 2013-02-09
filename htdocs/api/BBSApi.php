<?php

class BBSApi {

	/**
	 * Get category
	 *
	 * @param  int      Category id
	 * @return Array    Category object
	 */
	public static function getCategoryById ($categoryId) {
		return ORM::for_table('categories')
			->where_equal('id', $categoryId)
			->find_array();
	}

	/**
	 * Get thread list
	 *
	 * @param  int      Category id
	 * @return Array    Thread object list
	 */
	public static function getThreadsByCategoryId ($categoryId) {
		return ORM::for_table('threads')
			->where_equal('category_id', $categoryId)
			->find_array();
	}

	/**
	 * Get all catgegories
	 *
	 * @return Array    Category object list
	 */
	public static function getAllCategories() {
		return ORM::for_table('categories')->find_array();
	}

	/**
	 * Get posts
	 *
	 * @param int    Thread id
	 */
	
	public static function getPostsFromThreadId($threadId) {
		return ORM::for_table('posts')
			->select('posts.*')
			->select('users.name',       'user_name')
			->select('users.thumbnail',  'user_thumbnail')
			->select('threads.name',     'thread_name')
			->join('users', array(
				'users.id', '=', 'posts.user_id'
			))
			->join('threads', array(
				'threads.id', '=', 'posts.thread_id'
			))
			->where_equal('posts.thread_id', $threadId)
			->order_by_desc('posts.create_date')
			->find_array();
	}

	/**
	 * Save thread data
	 *
	 * @return Array   Error messages. If success to save it, return null.
	 */
	public static function saveThread($data) {
		// error messages
		$errmsgs = array();

		// params
		$params = array();
		$params['user_id']     = isset($data['user_id'])     ? $data['user_id']      : null;
		$params['name']        = isset($data['name'])        ? $data['name']         : null;
		$params['category_id'] = isset($data['category_id']) ? $data['category_id']  : null;


		if (isset($data['id'])) {
			// update
			$thread = ORM::for_table('threads')
				->where_equal('id', $data['id'])
				->find_one();

			if (! empty($params['name'])) $thread->set('name', $params['name']);

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
			$thread = ORM::for_table('threads')->create();
			$thread->set_expr('create_date', 'NOW()');
			$thread->set('name',        $params['name']);
			$thread->set('category_id', $params['category_id']);
			$thread->set('user_id',     $params['user_id']);
		}

		$thread->set_expr('update_date', 'NOW()');
		$thread->save();

		return null;
	}

	/**
	 * Save post data
	 *
	 * @return Array   Error messages. If success to save it, return null.
	 */
	public static function savePost($data) {
		// error messages
		$errmsgs = array();

		// params
		$params = array();
		$params['title']     = isset($data['title'])     ? $data['title']      : null;
		$params['user_id']   = isset($data['user_id'])   ? $data['user_id']    : null;
		$params['thread_id'] = isset($data['thread_id']) ? $data['thread_id']  : null;
		$params['contents']  = isset($data['contents'])  ? $data['contents']   : null;


		if (isset($data['id'])) {
			// update
			$post = ORM::for_table('posts')
				->where_equal('id', $data['id'])
				->find_one();

			if (! empty($params['title']))    $post->set('title',    $params['title']);
			if (! empty($params['contents'])) $post->set('contents', $params['contents']);

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
			$post = ORM::for_table('posts')->create();
			$post->set_expr('create_date', 'NOW()');
			$post->set('title',       $params['title']);
			$post->set('user_id',     $params['user_id']);
			$post->set('thread_id',   $params['thread_id']);
			$post->set('contents',    $params['contents']);
		}

		$post->set_expr('update_date', 'NOW()');
		$post->save();

		return null;
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

