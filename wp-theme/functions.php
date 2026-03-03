<?php
/**
 * Royal Devs Theme Functions
 *
 * @package RoyalDevs
 * @since 1.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Theme setup.
 */
function royaldevs_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo', array(
        'height'      => 60,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ) );
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ) );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'editor-styles' );

    register_nav_menus( array(
        'primary' => esc_html__( 'Primary Menu', 'royal-devs' ),
        'footer'  => esc_html__( 'Footer Menu', 'royal-devs' ),
    ) );

    // Set content width
    if ( ! isset( $content_width ) ) {
        $content_width = 720;
    }
}
add_action( 'after_setup_theme', 'royaldevs_setup' );

/**
 * Register widget areas.
 */
function royaldevs_widgets_init() {
    register_sidebar( array(
        'name'          => esc_html__( 'Blog Sidebar', 'royal-devs' ),
        'id'            => 'sidebar-1',
        'description'   => esc_html__( 'Widgets shown on blog and archive pages.', 'royal-devs' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ) );
}
add_action( 'widgets_init', 'royaldevs_widgets_init' );

/**
 * Enqueue styles and scripts.
 */
function royaldevs_enqueue_assets() {
    // Main stylesheet (style.css with theme header)
    wp_enqueue_style(
        'royaldevs-style',
        get_stylesheet_uri(),
        array(),
        wp_get_theme()->get( 'Version' )
    );

    // Custom CSS
    wp_enqueue_style(
        'royaldevs-custom',
        get_template_directory_uri() . '/assets/css/custom.css',
        array( 'royaldevs-style' ),
        wp_get_theme()->get( 'Version' )
    );

    // Custom JS
    wp_enqueue_script(
        'royaldevs-script',
        get_template_directory_uri() . '/assets/js/script.js',
        array(),
        wp_get_theme()->get( 'Version' ),
        true
    );
}
add_action( 'wp_enqueue_scripts', 'royaldevs_enqueue_assets' );

/**
 * Custom excerpt length.
 */
function royaldevs_excerpt_length( $length ) {
    return 25;
}
add_filter( 'excerpt_length', 'royaldevs_excerpt_length' );

/**
 * Custom excerpt "more" text.
 */
function royaldevs_excerpt_more( $more ) {
    return '&hellip;';
}
add_filter( 'excerpt_more', 'royaldevs_excerpt_more' );

/**
 * Customizer settings.
 */
function royaldevs_customize_register( $wp_customize ) {
    // Hero section
    $wp_customize->add_section( 'royaldevs_hero', array(
        'title'    => esc_html__( 'Hero Section', 'royal-devs' ),
        'priority' => 30,
    ) );

    $wp_customize->add_setting( 'royaldevs_hero_title', array(
        'default'           => 'Royal Devs',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'royaldevs_hero_title', array(
        'label'   => esc_html__( 'Hero Title', 'royal-devs' ),
        'section' => 'royaldevs_hero',
        'type'    => 'text',
    ) );

    $wp_customize->add_setting( 'royaldevs_hero_subtitle', array(
        'default'           => 'We build digital experiences that matter.',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'royaldevs_hero_subtitle', array(
        'label'   => esc_html__( 'Hero Subtitle', 'royal-devs' ),
        'section' => 'royaldevs_hero',
        'type'    => 'textarea',
    ) );

    $wp_customize->add_setting( 'royaldevs_hero_badge', array(
        'default'           => 'Premium Digital Agency',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'royaldevs_hero_badge', array(
        'label'   => esc_html__( 'Hero Badge Text', 'royal-devs' ),
        'section' => 'royaldevs_hero',
        'type'    => 'text',
    ) );

    // Contact section
    $wp_customize->add_section( 'royaldevs_contact', array(
        'title'    => esc_html__( 'Contact Section', 'royal-devs' ),
        'priority' => 40,
    ) );

    $wp_customize->add_setting( 'royaldevs_contact_email', array(
        'default'           => 'hello@royal-devs.com',
        'sanitize_callback' => 'sanitize_email',
    ) );
    $wp_customize->add_control( 'royaldevs_contact_email', array(
        'label'   => esc_html__( 'Contact Email', 'royal-devs' ),
        'section' => 'royaldevs_contact',
        'type'    => 'email',
    ) );

    // Blog section
    $wp_customize->add_section( 'royaldevs_blog', array(
        'title'    => esc_html__( 'Blog Settings', 'royal-devs' ),
        'priority' => 50,
    ) );

    $wp_customize->add_setting( 'royaldevs_blog_title', array(
        'default'           => 'Latest from the Blog',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'royaldevs_blog_title', array(
        'label'   => esc_html__( 'Blog Section Title', 'royal-devs' ),
        'section' => 'royaldevs_blog',
        'type'    => 'text',
    ) );
}
add_action( 'customize_register', 'royaldevs_customize_register' );
