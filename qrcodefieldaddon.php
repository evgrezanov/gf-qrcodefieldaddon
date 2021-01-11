<?php
/*
Plugin Name: QR Reader for Gravity Forms
Description: This plugin allows create QR reader field for gravityfrom.
Version: 1.0.0-dev
Author: Evgeniy Rezanov
Author URI: https://www.upwork.com/freelancers/~01ea58721977099d53
Copyright: 2020
*/

if (!defined('ABSPATH')) {
    die('-1');
}
if (!defined('QRRFGF_PLUGIN_NAME')) {
    define('QRRFGF_PLUGIN_NAME', 'QR Reader Gravity Form');
}
if (!defined('QRRFGF_PLUGIN_VERSION')) {
    define('QRRFGF_PLUGIN_VERSION', '1.0.0');
}
if (!defined('QRRFGF_PLUGIN_FILE')) {
    define('QRRFGF_PLUGIN_FILE', __FILE__);
}
if (!defined('QRRFGF_PLUGIN_DIR')) {
    define('QRRFGF_PLUGIN_DIR', plugins_url('', __FILE__));
}
if (!defined('QRRFGF_DOMAIN')) {
    define('QRRFGF_DOMAIN', 'qrrfgf');
}

// https://docs.gravityforms.com/including-new-field-using-add-on-framework/

add_action( 'gform_loaded', array('QRRFGF', 'load' ), 5 );

class QRRFGF {

    public static function load() {

        if ( ! method_exists( 'GFForms', 'include_addon_framework' ) ) {
            return;
        }

        require_once( 'class-gfqrcodefieldaddon.php' );

        GFAddOn::register( 'GFQRcodeFieldAddOn' );
    }

}
