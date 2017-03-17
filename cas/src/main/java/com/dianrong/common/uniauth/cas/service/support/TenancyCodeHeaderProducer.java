package com.dianrong.common.uniauth.cas.service.support;

import org.springframework.stereotype.Component;

import com.dianrong.common.uniauth.common.server.cxf.CxfHeaderHolder;
import com.dianrong.common.uniauth.common.server.cxf.client.impl.AbstractTenancyCodeHeaderProducer;

@Component
public class TenancyCodeHeaderProducer extends AbstractTenancyCodeHeaderProducer {
    @Override
    public String produce() {
        Object tenancyCode = CxfHeaderHolder.TENANCYCODE.get();
        return tenancyCode == null ? null : tenancyCode.toString();
    }

    @Override
    public int getOrder() {
        return LOWEST_PRECEDENCE;
    }
}
