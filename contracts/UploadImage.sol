// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Imageuploading{
    struct Access{
        address user;
        bool access;
    }
    mapping(address=>string[]) photos;
    mapping(address=>mapping(address=>bool)) ownership;
    mapping(address=>mapping (address=>bool)) status;
    mapping(address=>Access[]) accesslist;

    function upload(string memory url) public{
        photos[msg.sender].push(url);
    }

    function allowpermission(address ad) public{
        ownership[msg.sender][ad]=true;
        if(status[msg.sender][ad]==true){
            for(uint i;i<accesslist[msg.sender].length;i++){
                if(accesslist[msg.sender][i].user==ad){
                    accesslist[msg.sender][i].access=true;
                }
            }
        }
        else{
            accesslist[msg.sender].push(Access(ad,true));
            status[msg.sender][ad]=true;
        }
    }

    function denaypermission(address ad)public{
        ownership[msg.sender][ad]=false;
        for(uint i;i<accesslist[msg.sender].length;i++){
           if(accesslist[msg.sender][i].user==ad){
                    accesslist[msg.sender][i].access=false;
             }
        }
    }

    function display(address ad) public view returns(string[] memory){
        require(ad==msg.sender || ownership[ad][msg.sender]==true,"Need Authentication");
        return photos[ad];
    }

    function showaccesslist() public view returns(Access[] memory){
        return accesslist[msg.sender];
    }
}
