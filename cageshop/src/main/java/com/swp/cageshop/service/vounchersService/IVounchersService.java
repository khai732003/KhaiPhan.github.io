package com.swp.cageshop.service.vounchersService;


import com.swp.cageshop.entity.Vounchers;

import java.util.List;

public interface IVounchersService {
    public Vounchers addVounchers(Vounchers vounchers);

    public Vounchers updateVounchers(long id,Vounchers vounchers);

    public boolean deleteVounchers(long id);
    public List<Vounchers> getAllVounchers();

    public Vounchers getOneVounchers(long id);
}
