<?php
/**
 * Front page template — one-page layout with Navy & Gold design.
 *
 * @package RoyalDevs
 * @since 1.1.0
 */

get_header(); ?>

<!-- Hero -->
<section class="section section--hero section-divider" id="hero">
    <div class="container" style="position:relative;z-index:1;">
        <div class="hero__badge">&#9733; <?php esc_html_e( 'Premium Digital Agency', 'royal-devs' ); ?></div>
        <h1><?php echo esc_html( get_theme_mod( 'royaldevs_hero_title', 'Royal Devs' ) ); ?></h1>
        <p class="hero-subtitle"><?php echo esc_html( get_theme_mod( 'royaldevs_hero_subtitle', 'We build digital experiences that matter.' ) ); ?></p>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
            <a href="#services" class="btn btn--primary"><?php esc_html_e( 'Our Services', 'royal-devs' ); ?> &rarr;</a>
            <a href="#contact" class="btn btn--outline"><?php esc_html_e( 'Get in Touch', 'royal-devs' ); ?></a>
        </div>
    </div>
</section>

<!-- Services -->
<section class="section section--services section-divider" id="services">
    <div class="container">
        <h2 class="section__title text-gradient-gold"><?php esc_html_e( 'Services', 'royal-devs' ); ?></h2>
        <p class="section__subtitle"><?php esc_html_e( 'Everything you need to establish a powerful digital presence.', 'royal-devs' ); ?></p>
        <div class="grid grid--3">
            <div class="card">
                <div class="card__icon">&#128187;</div>
                <h3><?php esc_html_e( 'Web Development', 'royal-devs' ); ?></h3>
                <p><?php esc_html_e( 'Custom websites and web applications tailored to your business needs.', 'royal-devs' ); ?></p>
            </div>
            <div class="card">
                <div class="card__icon">&#127912;</div>
                <h3><?php esc_html_e( 'UI/UX Design', 'royal-devs' ); ?></h3>
                <p><?php esc_html_e( 'Intuitive, beautiful interfaces that delight your users.', 'royal-devs' ); ?></p>
            </div>
            <div class="card">
                <div class="card__icon">&#9889;</div>
                <h3><?php esc_html_e( 'SEO & Performance', 'royal-devs' ); ?></h3>
                <p><?php esc_html_e( 'Optimised for speed and search visibility from day one.', 'royal-devs' ); ?></p>
            </div>
        </div>
    </div>
</section>

<!-- Portfolio -->
<section class="section section--portfolio section-divider" id="portfolio">
    <div class="container">
        <h2 class="section__title text-gradient-gold"><?php esc_html_e( 'Portfolio', 'royal-devs' ); ?></h2>
        <p class="section__subtitle"><?php esc_html_e( 'Recent projects we are proud of.', 'royal-devs' ); ?></p>
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
                        <div class="card__body">
                            <h3><?php the_title(); ?></h3>
                            <p><?php the_excerpt(); ?></p>
                        </div>
                    </article>
                <?php endwhile;
                wp_reset_postdata();
            else : ?>
                <p style="color:var(--color-muted-fg);"><?php esc_html_e( 'Projects coming soon.', 'royal-devs' ); ?></p>
            <?php endif; ?>
        </div>
    </div>
</section>

<!-- About -->
<section class="section section--about section-divider" id="about">
    <div class="container">
        <h2 class="section__title text-gradient-gold"><?php esc_html_e( 'About Us', 'royal-devs' ); ?></h2>
        <p class="section__subtitle"><?php esc_html_e( 'We are a team of passionate developers and designers committed to delivering high-quality digital solutions.', 'royal-devs' ); ?></p>
    </div>
</section>

<!-- Latest Blog Posts -->
<section class="section section-divider" id="blog">
    <div class="container">
        <h2 class="section__title text-gradient-gold"><?php esc_html_e( 'Latest from the Blog', 'royal-devs' ); ?></h2>
        <p class="section__subtitle"><?php esc_html_e( 'Insights, tutorials, and updates from our team.', 'royal-devs' ); ?></p>
        <div class="grid grid--3">
            <?php
            $blog_posts = new WP_Query( array(
                'post_type'      => 'post',
                'posts_per_page' => 3,
                'tag__not_in'    => array(),
            ) );

            if ( $blog_posts->have_posts() ) :
                while ( $blog_posts->have_posts() ) : $blog_posts->the_post(); ?>
                    <article class="card card--portfolio">
                        <?php if ( has_post_thumbnail() ) : ?>
                            <?php the_post_thumbnail( 'medium_large' ); ?>
                        <?php endif; ?>
                        <div class="card__body">
                            <h3><a href="<?php the_permalink(); ?>" style="color:var(--color-fg);"><?php the_title(); ?></a></h3>
                            <p><?php echo wp_trim_words( get_the_excerpt(), 18 ); ?></p>
                            <a href="<?php the_permalink(); ?>" class="post-card__read-more"><?php esc_html_e( 'Read More →', 'royal-devs' ); ?></a>
                        </div>
                    </article>
                <?php endwhile;
                wp_reset_postdata();
            else : ?>
                <p style="color:var(--color-muted-fg);"><?php esc_html_e( 'No posts yet — check back soon!', 'royal-devs' ); ?></p>
            <?php endif; ?>
        </div>
        <div style="text-align:center;margin-top:2rem;">
            <a href="<?php echo esc_url( get_permalink( get_option( 'page_for_posts' ) ) ?: home_url( '/blog/' ) ); ?>" class="btn btn--outline"><?php esc_html_e( 'View All Posts', 'royal-devs' ); ?></a>
        </div>
    </div>
</section>

<!-- Contact -->
<section class="section section--contact" id="contact">
    <div class="container">
        <h2 class="section__title text-gradient-gold"><?php esc_html_e( 'Get in Touch', 'royal-devs' ); ?></h2>
        <p class="section__subtitle">
            <?php
            printf(
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
