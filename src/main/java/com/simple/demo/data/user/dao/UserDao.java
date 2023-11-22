package com.simple.demo.data.user.dao;


import com.simple.demo.data.user.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface UserDao {

    UserDto findByUserId(@Param("userId") String userId);
}
