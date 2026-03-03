<?php
/**
 * Single post template.
 *
 * @package RoyalDevs
 * @since 1.1.0
 */

get_header(); ?>

<?php while ( have_posts() ) : the_post(); ?>

<section class="section">
    <div class="container">
        <div class="single-post__header">
            <h1 class="single-post__title"><?php the_title(); ?></h1>
            <div class="single-post__meta">
                <span><?php echo get_the_date(); ?></span>
                <span><?php esc_html_e( 'by', 'royal-devs' ); ?> <?php the_author(); ?></span>
                <span><?php the_category( ', ' ); ?></span>
            </div>
        </div>

        <?php if ( has_post_thumbnail() ) : ?>
            <div style="max-width:720px;margin:0 auto 2rem;">
                <?php the_post_thumbnail( 'large', array( 'style' => 'border-radius:var(--radius);width:100%;' ) ); ?>
            </div>
        <?php endif; ?>

        <div class="single-post__content">
            <?php the_content(); ?>
        </div>

        <?php if ( get_the_tags() ) : ?>
            <div style="max-width:720px;margin:0 auto;padding:1rem 0;display:flex;gap:0.5rem;flex-wrap:wrap;">
                <?php foreach ( get_the_tags() as $tag ) : ?>
                    <a href="<?php echo esc_url( get_tag_link( $tag->term_id ) ); ?>"
                       style="padding:0.35rem 0.75rem;border-radius:999px;font-size:0.8rem;background:var(--color-muted);color:var(--color-primary);border:1px solid var(--color-border);">
                        #<?php echo esc_html( $tag->name ); ?>
                    </a>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <div class="post-navigation">
            <div><?php previous_post_link( '%link', '&larr; %title' ); ?></div>
            <div><?php next_post_link( '%link', '%title &rarr;' ); ?></div>
        </div>

        <?php
        if ( comments_open() || get_comments_number() ) :
            comments_template();
        endif;
        ?>
    </div>
</section>

<?php endwhile; ?>

<?php get_footer(); ?>
