<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="Drinking game, higher or lower. Online card game." />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="/css/app.css">
        <link rel="stylesheet" href="/css/font-awesome.min.css">
        <link rel="icon" href="images/favicon.ico" type="image/x-icon" />

        <script src="/js/app.js"></script>

        @yield('scripts')
        <script>
            $(document).ready(function(){
                $('.close-ads').click(function(){
                    $('.ad').fadeOut(100);
                });
            });
        </script>

        <title>Higher or Lower drinking game</title>
    </head>
    <body>
        <div id="wrapper">
            <header>
                <div class="mute-button">
                    <i class="fa fa-volume-up"></i>
                </div>
                <div class="logo">
                    <h3>
                        <span>Higher</span><small>-or-</small>Lower<small>.com</small>
                    </h3>
                </div>
            </header>
            <div class="game-links">
                    <ul>
                        <a href="/"><li class="game-link-normal">Normal</li></a><a href="/single"><li class="game-link-single">Single Card</li></a>
                    </ul>
                </div>
            <div id="content">
                @yield('content')
            </div>
            <div class="desktop-bottom-ad ad">
                <div class="close-ads"><i class="fa fa-remove"></i></div>
                <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                <!-- H-o-L bottom ad -->
                <ins class="adsbygoogle"
                     style="display:inline-block;width:728px;height:90px"
                     data-ad-client="ca-pub-5224714341460136"
                     data-ad-slot="1445732609"></ins>
                <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </div>
            <div class="mobile-bottom-ad ad">
                <div class="close-ads"><i class="fa fa-remove"></i></div>
                <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                <!-- h-o-l bottom ad mobile -->
                <ins class="adsbygoogle"
                     style="display:inline-block;width:320px;height:100px"
                     data-ad-client="ca-pub-5224714341460136"
                     data-ad-slot="5875932203"></ins>
                <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </div>
        </div> 
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-86827497-1', 'auto');
          ga('send', 'pageview');

        </script>
    </body>
</html>
