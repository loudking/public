package com.wanghongliang.demo;

import java.util.function.Function;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.Buildable;
import org.springframework.cloud.gateway.route.builder.PredicateSpec;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	public RouteLocator myRoutes(RouteLocatorBuilder builder, CommonMessage commonMessage) {
		return builder.routes()
                .route(commonMessage)
				.build();
	}
}

@Component
class CommonMessage extends RewritePath implements Function<PredicateSpec, Buildable<Route>> {
	@Autowired
	public CommonMessage(
			@Value("${country}") String country) {
		super(country);
	}

	@Override
	public Buildable<Route> apply(PredicateSpec predicateSpec) {
		return appendCountry("append country", predicateSpec);
	}
}

abstract class RewritePath {
	private String country;
	final private String uri="http://httpbin.org:80";
	final private String to = "/anything";

	public RewritePath(String country) {
		this.country = country;
	}

	private String buildPathPattern() {
		StringBuilder stringBuilder = new StringBuilder();
		stringBuilder.append("/{country:").append(country).append("}");
		return stringBuilder.toString();
	}

	final Buildable<Route> appendCountry(String hint, PredicateSpec predicateSpec) {
	    System.out.println(hint);
		String pathPattern = buildPathPattern();

		return predicateSpec
				.path(pathPattern)
				.filters(f -> f.rewritePath("^/(?<country>.*)", to + "/${country}"))
				.uri(uri);
	}
}
