$(function (){
    $('#gridName').focus();
    $("#gridSize").click(function() {
        $('#grid-form').remove();

        var rows = $('#row').val()===null ? 0 : $('#row').val();
        var columns = $('#column').val()===null ? 0 : $('#column').val();
        var i,j;

        var formElement = document.createElement('form');
        formElement.setAttribute('class','grid-form');
        formElement.setAttribute('id','grid-form');
        for(i=0;i<rows;i++){
            for(j=0;j<columns;j++){
                var inputElement = document.createElement('input');
                inputElement.setAttribute('class','grid-form-input');
                inputElement.setAttribute('id','i'+i.toString()+'_'+j.toString());
                inputElement.setAttribute('type','text');
                inputElement.setAttribute('maxlength','1');
                inputElement.setAttribute('pattern','^[lwLW]$');
                formElement.appendChild(inputElement);
            }
            var breakElement = document.createElement('br');
            formElement.appendChild(breakElement);
        }

        $("#gridRegion").append(formElement);
        $('#gridClear').prop('disabled',false);
        $('#inputAssist').show();
        $('#inputAssist').text('Enter \'L\' for Land. \'W\' for water. Default value is water');
        $('#i0_0').focus();
    });

    $("#gridClear").click(function(){
        $('#grid-form').remove();
        $('#gridSize').prop('disabled',false);
        $('#gridClear').prop('disabled',true);
    });

    $("#islandFind").click(function() {
        $('#inputAssist').hide();
        var rows = $('#row').val() === null ? 0 : $('#row').val();
        var columns = $('#column').val() === null ? 0 : $('#column').val();
        var gridName = ($('#gridName').val() === null ||$('#gridName').val()==='')
            ? Date.now().toString() : $('#gridName').val();

        $('#gridName').val('');
        if (rows === 0 || columns === 0) return;

        var i, j;

        var grid={
            name: gridName,
            rows: rows,
            columns: columns
        };

        for (i = 0; i < rows; i++) {
            for (j = 0; j < columns; j++) {
                grid[i.toString()+j.toString()] = $('#' + 'i' + i.toString() + '_' + j.toString()).val();
            }
        }

        var url = '/countIslands';
        $.post( url, grid)
            .done(function( result ) {
                $('#message').text('The number of islands in the given grid is '+result);


            });
    });

    $("#islandFind").bind('click', function(){
        $('#message').show();
    });

    $("#gridClear").bind('click', function(){
        $('#message').hide();
        $('#inputAssist').hide();
    });

    $('body').on('keyup', 'input', function(e) {
        var val = $(document.activeElement).val();
        var validInput = new RegExp('^[lwLW]$');
        var con = validInput.test(val);
        var keyHit = e.which;
        var keyWhiteList = [87,76];
        var keyBlackList = [9,13,16];
        if(e.currentTarget.className === 'grid-form-input' && !validInput.test(val)
            && val!==null && !keyBlackList.includes(keyHit))
            $(document.activeElement).css("background-color","#FF0000");
        if(e.currentTarget.className === 'grid-form-input' && validInput.test(val) && keyWhiteList.includes(keyHit)) {
            if(val.toLowerCase()==='l') $(document.activeElement).css("background-color","#228B22");
            if(val.toLowerCase()==='w') $(document.activeElement).css("background-color","#33BAFF");
            $(document.activeElement).next('input').focus();
        }

    });
});