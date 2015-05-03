"use strict";
$(function(){
    var
        $select_input = $('#id_utility'),
        $first_option = $select_input.find('> option:first'),
        $utility_name_div = $('#div_id_utility_name'),
        $utility_username_div = $('#div_id_utility_username'),
        $utility_username_label = $utility_username_div.find('> label'),
        $utility_username_input = $('#id_utility_username'),
        $utility_password_div = $('#div_id_utility_password'),
        $utility_password_label = $utility_password_div.find('> label'),
        $utility_password_input = $('#id_utility_password'),
        $choose_login_credentials = $('#choose_login_credentials'),
        $choose_auto_registration = $('#choose_auto_registration'),
        $pge_auto_registration_container = $('#pge_auto_registration_container'),
        $utility_credentials_container = $('#utility_credentials_container'),
        $login_registration_choice = $('#login_registration_choice'),
        $use_pge_registration_form_input = $('input#id_use_pge_registration_form'),
        $required_pge_inputs = $pge_auto_registration_container.find('.form-group:has(.requiredField) .controls input');

    function set_utility(utility_name){
        $utility_username_label.html(utility_name + ' username*');
        $utility_password_label.html(utility_name + ' password*');
        $('span.utility_name').html(utility_name);
        if(utility_name === 'PG&E'){
            $login_registration_choice.show();
        }else{
            $login_registration_choice.hide();
            use_login_credentials();
        }
    }

    function show_utility_inputs(){
        $utility_username_div.show();
        $utility_password_div.show();
    }

    function hide_utilty_inputs(){
        $utility_username_div.hide();
        $utility_password_div.hide();
    }

    function check_utility_choice(){
        // first option is not allowed - it just asks to check
        if($select_input.val() == $first_option.val()){
            hide_utilty_inputs();
            set_utility('Utility');
            // it's hidden in this case
            $utility_name_div.hide();
        }else {
            // assumes that the value of the option is the acronym of the utility
            var selected_utility_name = $select_input.find('> option:selected').val();
            show_utility_inputs();
            set_utility(selected_utility_name);
            $utility_name_div.hide();

            // if demo and no credentials are entered, auto-enter test / test
            if(selected_utility_name.toLowerCase() == 'demo'
                && !$utility_username_input.val() && !$utility_password_input.val()){
                $utility_username_input.val('test');
                $utility_password_input.val('test');
            }else if($utility_username_input.val() == 'test' && $utility_password_input.val()){
                // clear the test creds for real utilities
                $utility_username_input.val('');
                $utility_password_input.val('');
            }
        }
    }

    $select_input.on('change', check_utility_choice);


    function validate_inputs($elems){
        $elems.attr('required', 'required').removeAttr('formnovalidate').removeAttr('disabled');
    }

    function remove_input_validation($elems){
        $elems.removeAttr('required').attr('formnovalidate', 'formnovalidate').attr('disabled', 'disabled');
    }

    function use_auto_registration(){
        // for the moment, only applies to PG&E

        $use_pge_registration_form_input.prop('checked', true);

        $pge_auto_registration_container.show();
        $utility_credentials_container.hide();
        //
        $choose_auto_registration.hide();
        $choose_login_credentials.show();

        // make sure client-side validation doesn't give errors
        // on the wrong fields
        validate_inputs($required_pge_inputs);
        remove_input_validation($utility_username_input);
        remove_input_validation($utility_password_input);
    }

    function use_login_credentials(){
        // for the moment, only applies to PG&E

        $use_pge_registration_form_input.prop('checked', false);

        $pge_auto_registration_container.hide();
        $utility_credentials_container.show();
        //
        $choose_auto_registration.show();
        $choose_login_credentials.hide();

        // make sure client-side validation doesn't give errors
        // on the wrong fields
        validate_inputs($utility_username_input);
        validate_inputs($utility_password_input);
        remove_input_validation($required_pge_inputs);
    }

    function set_registration_needs(){
        // control whether a user is submitting login credentials or registration information
        if($choose_auto_registration.is(':visible')){
            use_auto_registration();
        }else if($choose_login_credentials.is(':visible')){
            use_login_credentials();
        }
        return false;
    }
    $choose_auto_registration.on('click', set_registration_needs);
    $choose_login_credentials.on('click', set_registration_needs);

    // AT INIT
    check_utility_choice(); // at init

    // show pge_registration form if there are errors in that form
    if($use_pge_registration_form_input.prop("checked")){
        use_auto_registration();
    }

    // hide the use_pge_registration_form input
    $use_pge_registration_form_input.parents('.form-group').hide();

    // add several 'see example links'
    $('#div_id_pge_account_number, #div_id_pge_meter_number').find('label').after(
        ' <a href="javascript:void(0);" data-toggle="modal" data-target="#pge_bill_modal">See example</a>.'
    );
});
