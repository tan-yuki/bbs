/**
 * Required: todo.client
 * Required: model
 */
(function($, __global__) {


    String.prototype.trim = function() {
        return this.replace(/^ +| +$/g, '');
    };

    var   userId = 1 //TODO: Get userId from Cookies
        , Task = Model.create()
        , updateUrl = '/api/task/save/'
        ;

    Task.attributes = ['id', 'title', 'description', 'checked'];

    Task.extend({
        render: function() {
            var $todoInner = $('#todo-inner')
            // renderer
            var html = $('#task-tmpl').tmpl(this.toArray());
            $todoInner.find('ul').html(html);
        }
    });

    var refreshView = function() {
    };

    var createStates = function() {
        var $todoInner = $('#todo-inner')
          , $taskList = $todoInner.find('li.task')
          , $taskTmpl = $('#task-tmpl')

        // Create StateMachine
        var TaskStateMachine = new StateMachine();

        // Create Normal StateMachine
        // This control events on normal status.
        var NormalState = TaskStateMachine.create({
            elem: $taskList.find('div.task-contents')
        });

        // Create Editing StateMachine
        // This control events on editing tasks.
        var EditState = TaskStateMachine.create({
            elem: $taskList.find('input[type=text]')
        });


        // register events on NormalState
        NormalState.on('click', function(e) {
            var $this = $(this);
            $this.find('a').hide();
            $this.find('input[type=text]').val($this.text().trim()).show().focus();
            TaskStateMachine.switchTo(EditState);
        });

        // register events on EditState
        EditState.on('finishEditing', function(e, $this) {
            var $link = $this.prev('a'),
                taskId = $this.parents('li.task').attr('id'),
                task = Task.find(taskId),
                newTitle = $this.val().trim();

            // update dom element
            $link.text(newTitle);

            // update model
            task.title = newTitle;
            task.save();
            task.updateRemote(updateUrl);

            // change to anchor
            $this.hide();
            $link.show();

            // change Normal state
            TaskStateMachine.switchTo(NormalState);
        });
        EditState.on('blur', function(e) {
            EditState.fire('finishEditing', [$(this)]);
        });

        EditState.on('keypress', function(e) {
            var $this = $(this);
            if ($this.is(':focus') && e.which === 13) { // focus text field and press the enter key
                EditState.fire('finishEditing', [$this]);
            }
        });

        // Default status -> NormalState
        TaskStateMachine.switchTo(NormalState);
    };

    $(function() {

        // bind Add btn event
        $('#add-task').click(function() {
            var newTask = Task.init();
            newTask.save();

            // re-render
            Task.render();

            // re-create state
            createStates();

            // Change to EditState in added task
            $('#todo-inner').find('div.task-contents:last').click();
        });

        // Get user's task list
        var taskAjax = $.getJSON('/api/task/' + userId + '/', function(data) {
            Task.populate(data.body);
        });



        $.when(taskAjax).done(function() {
            // render task list
            Task.render();

            // after drawed, create states
            createStates();

        });
    });
})(this.jQuery, this);

