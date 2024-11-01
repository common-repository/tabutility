<?php
   /*
   Plugin Name: TabUtility
   Plugin URI: http://www.tabutility.com
   Description: Get the attention back on your tab!
   Version: 1.0
   Author: tabutility.com
   License: GPL2
   */

	require_once( dirname( __FILE__ ) . '/options.php' );

	add_action('init', 		'tabutility_init');

	function tabutility_init()
	{
		wp_register_script('tabutility', plugins_url('tabutility.js', __FILE__), array(), '1.0', true);
	}
	
	add_shortcode('tabutility', 'tabutility_tag');
	
	function tabutility_tag( $atts )
	{	
		global $defaultOptions;
	
		wp_enqueue_script( 'tabutility' );
		
		$settings = wp_parse_args( get_option( 'tabutility_settings', $defaultOptions ), $defaultOptions);
		$settings = wp_parse_args( $atts, $settings);
		
		$settings["attract_base_asset_folder"] = plugin_dir_url( __FILE__ )."icons/";
    	$settings["offer_base_asset_folder"]   = plugin_dir_url( __FILE__ )."buttons/";

		wp_localize_script('tabutility',"TabUtilityScriptSetup", $settings );     
	
	    return "";
	}






?>