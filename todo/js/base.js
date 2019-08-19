;
(function () {
    "use strict"        // 严格模式
    var $from_add_task = $(".add-task"),
        $delete_task,
        task_list = {};
    console.log($delete_task)
    init();
    $from_add_task.on("submit", on_add_task_form_submit)

    function on_add_task_form_submit(e) {
        var new_task = {};      // 新增的任务对象
        // 禁用默认行为
        e.preventDefault();
        // 获取新Task的值
        var $input = $(this).find('input[name=content]')    
        new_task.content = $input.val();
        // 如果task的值为空，则直接返回，否则继续执行
        if (!new_task.content) return;
        // 存入新的task
        if (add_task(new_task))
            // render_task_list();
            $input.val(null)
    }
    // 查找并监听所有的点击事件
    function listen_dele_task() {
        $delete_task.on("click", function () {      // 删除任务
            var $this = $(this);
            // 找到删除按钮所在的task元素，删除按钮是span，要找到其祖父元素
            var $item = $this.parent().parent();
            var index = $item.data('index');
            // 确认删除
            var tmp = confirm("确定删除");
            tmp ? delete_task(index) : null;
        })
    }

    // 新的task
    function add_task(new_task) {
        // 将task推入task_list
        task_list.push(new_task);
        // 更新localstorage
        refresh_task_list();
        return true;
    }
    // 刷新缓存,并渲染模板
    function refresh_task_list() {
        store.set("task_list", task_list);
        render_task_list();
    }
    // 删除一条task
    function delete_task(index) {
        if (!index === undefined || !task_list[index]) return;      // index未定义或者为空
        delete task_list[index];        // 如果存在则删除
        refresh_task_list()
    }
    // 推送数据到缓存中
    function init() {
        task_list = store.get('task_list') || []
        if (task_list.length)
            render_task_list();
    };
    // 渲染全部的task模板
    function render_task_list() {
        var $task_list = $(".task-list");
        $task_list.html('');
        for (var i = 0; i < task_list.length; i++) {
            var $task = render_task_item(task_list[i], i)
            $task_list.append($task)
        }
        $delete_task = $('.action.delete');
        listen_dele_task()
    }

    // 渲染单条task HTML模板
    function render_task_item(data, index) {
        if (!data || !index) return;       // 没有index或者没有data
        var list_item_tpl =
            '<div class="task-item" data-index="' + index + '">' +
            '<span> <input type = "checkbox"/> </span>' +
            '<span class="task-content">' + data.content + '</span> ' +
            '<span class="fr">' +
            '<span class="action delete">删除 </span> ' +
            '<span class="action"> 详细</span>' +
            '</span>' +
            '</div>';
        return $(list_item_tpl)
    }
})();