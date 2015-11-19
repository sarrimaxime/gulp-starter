<?php

require '../vendor/autoload.php';
require '../config.php';
require 'App/Router.php';
require 'App/utils/twigExtension/TwigExtension.php';

use \Slim\Slim;

// ------------------------------------------------o Create App

$app = new Slim();

$app->config(array(
	'view' => new \Slim\Views\Twig(),
	'log.level' => \Slim\Log::DEBUG,
	'debug' => (ENV === true) ? true : false,
	'templates.path' => 'App/views',
	'mode' => (ENV === true) ? 'production' : 'development'
));

$twigExtension = new TwigExtension();
$utils = new Twig\Blank\Utils();


// ------------------------------------------------o Register Twig extensions

$app->view->parserExtensions = array(
	$twigExtension,
	$utils,
	new Twig\Blank\Component(),
	new Twig_Extension_StringLoader(),
);


// ------------------------------------------------o Activate twig cache

if (ENV === true) {
	$app->view->parserOptions = array(
		'cache' => dirname(__FILE__) . '/cache'
	);
}



// ------------------------------------------------o Create Router

$router = new Router($app);



// ------------------------------------------------o App request

$app->get('(/)(/:params+)', function($params = array()) use ($app, $router, $utils){
	

	$data = $router->getData($params);
	$data['ajax'] = $app->request->isAjax();

	$utils->setTranslations($router->getTranslations());

	if ( !isset($data['route']->view) ){
		$statusCode = 404;
		if ($data['ajax'] == true){
			$statusCode = 200;
		}
		$data['route'] = array('view' => '404');
		$app->render($data['viewFolder'] . '/pages/404.html.twig', $data, $statusCode);
	}
	else {
		$app->render( $data['viewFolder'] . '/pages/' . $data['route']->view . '.html.twig', $data);
	}

});



// ------------------------------------------------o Run the app

$app->run();