<?php
/**
 * Front page template — one-page layout.
 *
 * @package RoyalDevs
 * @since 1.0.0
 */

get_header(); ?>

<!-- Hero -->
<section class="section section--hero" id="hero">
    <div class="container">
        <h1><?php echo esc_html( get_theme_mod( 'royaldevs_hero_title', 'Royal Devs' ) ); ?></h1>
        <p class="hero-subtitle"><?php echo esc_html( get_theme_mod( 'royaldevs_hero_subtitle', 'We build digital experiences that matter.' ) ); ?></p>
        <a href="#services" class="btn btn--primary"><?php esc_html_e( 'Our Services', 'royal-devs' ); ?></a>
    </div>
</section>

<!-- Services -->
<section class="section section--services" id="services">
    <div class="container">
        <h2><?php esc_html_e( 'Services', 'royal-devs' ); ?></h2>
        <div class="grid grid--3">
            <div class="card">
                <h3><?php esc_html_e( 'Web Development', 'royal-devs' ); ?></h3>
                <p><?php esc_html_e( 'Custom websites and web applications tailored to your business needs.', 'royal-devs' ); ?></p>
            </div>
            <div class="card">
                <h3><?php esc_html_e( 'UI/UX Design', 'royal-devs' ); ?></h3>
                <p><?php esc_html_e( 'Intuitive, beautiful interfaces that delight your users.', 'royal-devs' ); ?></p>
            </div>
            <div class="card">
                <h3><?php esc_html_e( 'SEO & Performance', 'royal-devs' ); ?></h3>
                <p><?php esc_html_e( 'Optimised for speed and search visibility from day one.', 'royal-devs' ); ?></p>
            </div>
        </div>
    </div>
</section>

<!-- Portfolio -->
<section class="section section--portfolio" id="portfolio">
    <div class="container">
        <h2><?php esc_html_e( 'Portfolio', 'royal-devs' ); ?></h2>
        <div class="grid grid--2">
            <?php
            $projects = new WP_Query( array(
                'post_type'      => 'post',
                'posts_per_page' => 4,
                'tag'            => 'portfolio',
            ) );

            if ( $projects->have_posts() ) :
                while ( $projects->have_posts() ) : $projects->the_post(); ?>
                    <article class="card card--portfolio">
                        <?php if ( has_post_thumbnail() ) : ?>
                            <?php the_post_thumbnail( 'large' ); ?>
                        <?php endif; ?>
                        <h3><?php the_title(); ?></h3>
                        <p><?php the_excerpt(); ?></p>
                    </article>
                <?php endwhile;
                wp_reset_postdata();
            else : ?>
                <p><?php esc_html_e( 'Projects coming soon.', 'royal-devs' ); ?></p>
            <?php endif; ?>
        </div>
    </div>
</section>

<!-- About -->
<section class="section section--about" id="about">
    <div class="container">
        <h2><?php esc_html_e( 'About Us', 'royal-devs' ); ?></h2>
        <p><?php esc_html_e( 'We are a team of passionate developers and designers committed to delivering high-quality digital solutions.', 'royal-devs' ); ?></p>
    </div>
</section>

<!-- Contact -->
<section class="section section--contact" id="contact">
    <div class="container">
        <h2><?php esc_html_e( 'Get in Touch', 'royal-devs' ); ?></h2>
        <p>
            <?php
            printf(
                /* translators: %s: email address */
                esc_html__( 'Email us at %s', 'royal-devs' ),
                '<a href="mailto:' . esc_attr( get_theme_mod( 'royaldevs_contact_email', 'hello@royal-devs.com' ) ) . '">'
                    . esc_html( get_theme_mod( 'royaldevs_contact_email', 'hello@royal-devs.com' ) )
                    . '</a>'
            );
            ?>
        </p>
    </div>
</section>

<?php get_footer(); ?>
