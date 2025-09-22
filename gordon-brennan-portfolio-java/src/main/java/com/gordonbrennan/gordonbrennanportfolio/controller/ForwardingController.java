package com.gordonbrennan.gordonbrennanportfolio.controller;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ForwardingController {

    @RequestMapping(value = "/{path:[^\\.]*}")
    public String forward() {
        return "forward:/";
    }
}
