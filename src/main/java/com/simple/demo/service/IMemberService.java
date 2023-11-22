package com.simple.demo.service;


import com.simple.demo.data.common.dto.SingleResult;
import com.simple.demo.data.user.dto.LoginRequestT;
import com.simple.demo.data.user.dto.UserDto;

public interface IMemberService {
	UserDto findByUserId(String userId);

	SingleResult<String> login(LoginRequestT loginRequestT) ;
}
