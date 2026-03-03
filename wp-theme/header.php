<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="msvalidate.01" content="E71DD5F5D0F67286D13251E0796166BC">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header" id="top">
    <nav class="site-nav">
        <div class="nav-inner">
            <a class="site-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>">
                <?php if ( has_custom_logo() ) : ?>
                    <?php the_custom_logo(); ?>
                <?php else : ?>
                    <span class="text-gradient-gold"><?php bloginfo( 'name' ); ?></span>
                <?php endif; ?>
            </a>

            <button class="menu-toggle" aria-label="<?php esc_attr_e( 'Toggle menu', 'royal-devs' ); ?>" aria-expanded="false">
                <span class="hamburger"></span>
            </button>

            <?php
            wp_nav_menu( array(
                'theme_location' => 'primary',
                'container'      => false,
                'menu_class'     => 'nav-links',
                'fallback_cb'    => false,
            ) );
            ?>
        </div>
    </nav>
</header>

<main class="site-main">
