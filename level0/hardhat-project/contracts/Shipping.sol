// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 < 0.9.0;


/**
 需求：
 跟踪从在线市场购买的商品的状态。
 创建该合约时，装运状态设置为 Pending 。 
 装运商品后，则将装运状态设置为 Shipped 并会发出事件。 
 交货后，则将商品的装 运状态设置为 Delivered ，并发出另⼀个事件。
 */

contract Shipping {
	// 枚举装运状态
	enum ShipStatus {Pending, Shipped, Delivered}
	ShipStatus private status;

	constructor() {
		status = ShipStatus.Pending;
	}

	// 提示
	event LogNewAlert(string description); 
	// 装运后
	function Shipped() public {
		status = ShipStatus.Shipped;
		emit LogNewAlert('Your package has been shipped');
	}
	// 交货后
	function Delivered() public {
		status = ShipStatus.Delivered;
		emit LogNewAlert('Your package has arrived');
	}

	// 获取status
	function getStatus(ShipStatus _status) internal pure returns(string memory statusText) {
		if (ShipStatus.Pending == _status) return 'Pending';
		if (ShipStatus.Shipped == _status) return 'Shipped';
		if (ShipStatus.Delivered == _status) return 'Delivered';
	}
	function Status() public view returns(string memory) {
		ShipStatus _status = status;
		return getStatus(_status);
	}
}