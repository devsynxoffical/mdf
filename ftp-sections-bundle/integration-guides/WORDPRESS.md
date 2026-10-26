# 📝 Integrating into WordPress / Elementor / Divi

This guide covers how to integrate the sections into WordPress using Gutenberg, Elementor, or a child theme.

---

## 1. Upload Assets

1. Upload images and video files to your WordPress **Media Library**, OR
2. Upload the `assets/` folder to your child theme or `wp-content/uploads/ftp-assets/` via FTP or cPanel File Manager.

---

## 2. Enqueue CSS & JS in your Child Theme (Recommended)

In your child theme's `functions.php`:
```php
function enqueue_ftp_sections() {
    // Fonts
    wp_enqueue_style('ftp-fonts', 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap', array(), null);
    
    // FTP Master Stylesheet
    wp_enqueue_style('ftp-styles', get_stylesheet_directory_uri() . '/css/ftp-styles.css', array(), '1.0');

    // Section Scripts (load in footer)
    wp_enqueue_script('ftp-opening', get_stylesheet_directory_uri() . '/js/opening.js', array(), '1.0', true);
    wp_enqueue_script('ftp-portfolio', get_stylesheet_directory_uri() . '/js/portfolio-iphone.js', array(), '1.0', true);
    wp_enqueue_script('ftp-cases-data', get_stylesheet_directory_uri() . '/js/cases.js', array(), '1.0', true);
    wp_enqueue_script('ftp-leads-data', get_stylesheet_directory_uri() . '/js/leads.js', array(), '1.0', true);
    wp_enqueue_script('ftp-case-studies', get_stylesheet_directory_uri() . '/js/case-studies.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'enqueue_ftp_sections');
```

---

## 3. Inserting with Elementor

1. Open Elementor on your target page.
2. Drag an **HTML Code** widget onto the canvas.
3. Paste the contents of:
   - `vanilla-html/opening.html` (for the Opening section)
   - `vanilla-html/portfolio-iphone.html` (for the iPhone Duo Portfolio)
   - `vanilla-html/case-studies-hub.html` (for the Case Studies Hub)
4. Ensure the section container is set to **Full Width** with **No Gap** (0 padding).
5. If you prefer self-contained code inside Elementor, you can paste the `<style>` block and `<script>` directly inside the HTML widget!

---

## 4. Shortcode Approach (Alternative)

You can create simple shortcodes in `functions.php`:
```php
function ftp_opening_shortcode() {
    ob_start();
    include get_stylesheet_directory() . '/templates/opening.html';
    return ob_get_clean();
}
add_shortcode('ftp_opening', 'ftp_opening_shortcode');

function ftp_portfolio_shortcode() {
    ob_start();
    include get_stylesheet_directory() . '/templates/portfolio-iphone.html';
    return ob_get_clean();
}
add_shortcode('ftp_portfolio', 'ftp_portfolio_shortcode');
```
Then simply type `[ftp_opening]` or `[ftp_portfolio]` into any Gutenberg block or page editor!
