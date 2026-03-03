</main><!-- .site-main -->

<footer class="site-footer">
    <div class="footer-inner">
        <div class="footer__brand">
            <span class="text-gradient-gold"><?php bloginfo( 'name' ); ?></span>
        </div>
        <p class="footer__text">&copy; <?php echo date( 'Y' ); ?> <?php bloginfo( 'name' ); ?>. All rights reserved.</p>
        <?php
        wp_nav_menu( array(
            'theme_location' => 'footer',
            'container'      => false,
            'menu_class'     => 'footer__links',
            'fallback_cb'    => false,
            'depth'          => 1,
        ) );
        ?>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
