package com.simple.demo.data.user.dto;

import lombok.Data;

@Data
public class UserDto {
	private long ID;

	private String user_id;

	private String username;
	
	private String password;
	
	private String group_id;

	private String group_name;

}
