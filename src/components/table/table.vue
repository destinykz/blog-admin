<template>
    <table class="cdl-table">
        <thead>
            <tr>
                <th>姓名</th>
                <th>年龄</th>
                <th>性别</th>
                <th>爱好</th>
                <th>婚否</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>小明</td>
                <td>20</td>
                <td>男</td>
                <td>女</td>
                <td>未婚</td>
            </tr>
            <tr>
                <td>小明</td>
                <td>20</td>
                <td>男</td>
                <td>女</td>
                <td>未婚</td>
            </tr>
            <tr>
                <td>小明</td>
                <td>20</td>
                <td>男</td>
                <td>女</td>
                <td>未婚</td>
            </tr>
            <tr>
                <td>小明</td>
                <td>20</td>
                <td>男</td>
                <td>女</td>
                <td>未婚</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
    .cdl-table {
        width: 100%;
        text-align: center;
        color: @color;
    }
    .cdl-table tr {
        border-bottom: 1px solid #f2f6fd;
    }
    .cdl-table tr:hover {
        background-color: @bg;
    }
    .cdl-table th, .cdl-table td {
        height: 44px;
        line-height: 44px;
    }
    .cdl-table th {
        font-size: 14px;
    }
    .cdl-table td {
        font-size: 12px;
    }
</style>