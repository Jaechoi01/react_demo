package com.simple.demo.service;

import com.simple.demo.common.ErrorCode;
import com.simple.demo.common.JwtUtil;
import com.simple.demo.data.user.dao.UserDao;
import com.simple.demo.data.common.dto.SingleResult;
import com.simple.demo.data.user.dto.LoginRequestT;
import com.simple.demo.data.user.dto.UserDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class MemberService implements IMemberService {

	@Value("${jwt.secret_key}")
	private String secretKey;

	private final Long EXPIRED_MILLISECOND = 1000 * 60 * 60L;

	@Autowired(required=true)
	private final UserDao _userDao;

	public MemberService( UserDao userDao) {
	    this._userDao = userDao;
	}

	@Override
	public UserDto findByUserId(String userId){
		return  _userDao.findByUserId(userId);
	}

	@Override
	public SingleResult<String> login(LoginRequestT loginRequestT)
	{
		SingleResult<String> result = new SingleResult<>();

		UserDto user = findByUserId(loginRequestT.getUserId());



		if(user != null)
		{
			if(loginRequestT.getPassword().equals(user.getPassword()))
			{
				result.setSucess(true);
				result.setCode(0);
				result.setMessage("");
				result.setData(JwtUtil.createJwt(user, secretKey, EXPIRED_MILLISECOND));
			}
			else
			{
				result = getErrorResult(ErrorCode.USER_WRONG_PASSWORD);
			}

		}
		else
		{
			result = getErrorResult(ErrorCode.USER_NOT_EXIST);
		}
		return result;
	}

	private SingleResult<String> getErrorResult(ErrorCode errorCode)
	{
		SingleResult<String> result = new SingleResult<>();
		result.setSucess(false);
		result.setCode(errorCode.getCode());
		result.setMessage(errorCode.getMessage());
		result.setData("");
		return result;
	}
}
