<?php
/**
 * Generic page template.
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
        </div>

        <div class="single-post__content">
            <?php the_content(); ?>
        </div>
    </div>
</section>

<?php endwhile; ?>

<?php get_footer(); ?>
