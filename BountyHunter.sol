// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

contract BountyHunter {
    struct Task {
        uint256 id;
        string IPFSCid;
        uint256 reward;
        bool completed;
        address owner;
        uint256 price;
    }

    struct TaskId {
        uint256 id;
    }

    uint256 id = 0;

    mapping(uint256 => address) public ownerById;
    mapping(uint256 => address) public winner;
    mapping(address => uint[]) tasksByWinner;
    mapping(address => TaskId[]) subscriptions;

    Task[] public tasks;
    Task[] public tasksByOwner;

    function addTask(
        string memory _IPFSCid,
        uint256 _reward,
        uint256 _price
    ) public payable {
        require(msg.value >= _reward);
        tasks.push(
            Task({
                id: id,
                IPFSCid: _IPFSCid,
                reward: msg.value,
                completed: false,
                owner: msg.sender,
                price: _price
            })
        );
        ownerById[id] = msg.sender;
        id++;
    }

    function getOwnerById(uint256 _id) public view returns (address) {
        return tasks[_id].owner;
    }

    function getAllTasks() public view returns (Task[] memory) {
        return tasks;
    }

    function getAllTasksByOwner(address _owner)
        public
        returns (Task[] memory)
    {
        for (uint256 i = 0; i <= id; i++) {
            if (ownerById[i] == _owner) {
                tasksByOwner.push(
                    Task({
                        id: tasks[i].id,
                        IPFSCid: tasks[i].IPFSCid,
                        reward: tasks[i].reward,
                        completed: tasks[i].completed,
                        owner: tasks[i].owner,
                        price: tasks[i].price
                    })
                );
            }
        }
        return tasksByOwner;
    }

    function getAllTasksByWinner(address _winner)
        public view
        returns (uint[] memory)
    {
        return tasksByWinner[_winner];
    }

    function subscribe(uint256 _taskId) public payable {
        require(msg.value >= tasks[_taskId].price);
        subscriptions[msg.sender].push(TaskId(_taskId));
        tasks[_taskId].reward += msg.value;
    }

    function getSubscriptions(address _subscriber)
        public
        view
        returns (TaskId[] memory)
    {
        return subscriptions[_subscriber];
    }

    function transferReward(uint256 _taskId)
        public
        payable
        returns (bool, bytes memory)
    {
        require(winner[_taskId] == msg.sender);
        (bool sent, bytes memory data) = msg.sender.call{
            value: tasks[_taskId].reward
        }("");
        return (sent, data);
    }

    function completeTask(address _to, uint256 _taskId) public {
        require(tasks[_taskId].owner == msg.sender);
        winner[_taskId] = _to;
        tasksByWinner[_to].push(_taskId);
        tasks[_taskId].completed = true;
    }

    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
