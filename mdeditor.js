$.fn.extend({
    insertAtCursor: function(value) {
        var textarea = $(this)[0];
        var start = textarea.selectionStart;
        var end = textarea.selectionEnd;
        var selected = window.getSelection().toString();
        
        selected = value + selected.replace(/\n/g,'\n'+value);
        textarea.value = textarea.value.substring(0,start) + selected + textarea.value.substring(end);
        textarea.setSelectionRange(start+value.length,start+selected.length);
        
        this.focus();

        return this;
    },
    moveCursor: function(relativeIndex) {
        var textarea = $(this)[0];
        var startPos = textarea.selectionStart;
        var index = startPos + relativeIndex;
        
        textarea.setSelectionRange(index, index);

        return this;
    },
});

// Value Change Event
$.event.special.valuechange = {
    teardown: function (namespaces) {
        $(this).unbind('.valuechange');
    },
    handler: function (e) {
        $.event.special.valuechange.triggerChanged($(this));
    },
    add: function (obj) {
        $(this).on('keyup.valuechange cut.valuechange paste.valuechange input.valuechange', obj.selector, $.event.special.valuechange.handler);
    },
    triggerChanged: function (element) {
        var current = element[0].contentEditable === 'true' ? element.html() : element.val(),
            previous = typeof element.data('previous') === 'undefined' ? element[0].defaultValue : element.data('previous');
        if (current !== previous) {
            element.trigger('valuechange', [element.data('previous')]);
            element.data('previous', current);
        }
    }
}


// v0.3.2
;(function() {
    "use strict";

    /*=========================================
    ************   Markdown Editor   **********
    ==========================================*/
    var ME, MarkdownEditor;
    ME = MarkdownEditor = function(container) {
        var md = this;
        var container = $(container);
        var previewContainer = container.find('.preview');
        var textarea = container.find('textarea');
        var buttons = container.find('.toolbar a');
        var tipContainer = container.find('.tips span');

        const tips = [
            '将图片文件直接拖动到编辑区域即可上传',
            '使用英文#井号，引用指定id的问题，比如#123'
        ];

        // 绑定事件
        md.bindEvents = function() {

            // Textarea 事件
            textarea.on({
                keydown: function(e) {
                    if (e.keyCode == 9) {// 支持tab缩进
                        e.preventDefault();
                        $(this).insertAtCursor('    ');
                    } else if (e.keyCode == 27) {// 支持esc退出全屏模式
                        $('body').removeClass('fullscreen-mode');

                        md.toggleFullscreenText();
                    }
                },
                valuechange: function(e) {
                    var text = $(this).val();
                    var html = marked(text);
                    marked.setOptions({
                        gfm: true,
                        breaks: true,
                        highlight: function (code) {
                            return hljs.highlightAuto(code).value;
                        }
                    });
                    previewContainer.html(html);
                }
            });

            // 底部按钮事件
            buttons.click(function() {
                var _this = $(this);
                // Link
                if(_this.hasClass('fa-link')) {
                    textarea.insertAtCursor('[](http://)').moveCursor(-10);
                }
                // Table
                else if(_this.hasClass('fa-table')) {
                    textarea.insertAtCursor('\n|A|B|C|\n|:-|:-:|-:|\n|1|2|3|\n').moveCursor(-26);
                }
                // Sidebyside mode
                else if(_this.hasClass('fa-columns')) {
                    $('.dw-markdown').addClass('sidebyside-mode');
                }
                // WriteOnly mode
                else if(_this.hasClass('fa-file-o')) {
                    $('.dw-markdown').removeClass('sidebyside-mode');
                }
                // Fullscreen
                else if(_this.hasClass('fa-expand')) {
                    $('body').toggleClass('fullscreen-mode');

                    md.toggleFullscreenText();
                }
                textarea.focus().trigger('valuechange');
            });
        }

        md.toggleFullscreenText = function() {
            $('.fa-expand').attr('data-original-title', ($('body').hasClass('fullscreen-mode') ? '缩小' : '全屏'));
        }

        md.init = function() {
            md.bindEvents();

            // 显示提示语
            tipContainer.html(tips[Math.floor(Math.random() * tips.length)]);
        }

        md.getEditor = function(container, params) {
            return new MarkdownEditor(container, params);
        }

        md.init();

        return md;
    }

    ME = new ME();

    // exports [AMD/RequireJS/Global]
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return ME;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = ME;
    } else {
        (typeof window !== 'undefined' ? window : this).ME = ME;
    }
})();

