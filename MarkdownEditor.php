<?php
namespace common\widgets;

use yii\web\AssetBundle;

class MarkdownEditorAsset extends AssetBundle
{
    public $baseUrl = '@web/static/lib/cdiwo/mdeditor';

    public $css = [
        'md.css',
    ];

    public $js = [
        'marked.min.js',
        'mdeditor.min.js',
    ];

    public $depends = [
        'yii\web\JqueryAsset',
    ];
}

class MarkdownEditor extends \yii\widgets\InputWidget
{
    public $id = null;
    public $name = null;
    public $value = '';

    public function init() {

    }

    public function run() {
        MarkdownEditorAsset::register($this->view);

        if($this->id === null) {
            $this->id = '#markdown-editor';
        }
        if($this->name === null) {
            $this->name = 'content';
        }
        $html =
            '<div id="' . $this->id . '" class="dw-markdown row-fluid active">
            <div class="main">
                <div class="preview"></div>
                <textarea class="text mousetrap" name="' . $this->name . '">' . $this->value . '</textarea>
            </div>
            <div class="toolbar">
                <div class="pull-left tips"><b>提示: </b><span></span></div>
                <div class="pull-right ">
                    <ul class="inline-menu">
                        <li><a class="fa fa-link" data-toggle="tooltip" data-original-title="插入链接"></a></li>
                        <li><a class="fa fa-picture-o" data-toggle="tooltip" data-original-title="插入图片"></a></li>
                        <li><a class="fa fa-table" data-toggle="tooltip" data-original-title="插入表格"></a></li>
                        <li><i class="fa ">|</i></li>
                        <li class="sidebyside-btn"><a class="fa fa-columns"href="javascript:;" data-action="trigger-sidebyside-mode" data-toggle="tooltip" 
                            data-original-title="并排模式"></a></li>
                        <li class="writeonly-btn"><a class="fa fa-file-o"href="javascript:;" data-action="trigger-writeonly-mode" data-toggle="tooltip" 
                            data-original-title="写作模式"></a></li>
                        <li><a class="fa fa-expand" href="javascript:;" data-action="trigger-fullscreen-mode" data-toggle="tooltip" 
                            data-original-title="全屏"></a></li>
                    </ul>
                </div>
            </div>
        </div>';

        return $html;
    }
}
