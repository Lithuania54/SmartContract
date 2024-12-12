// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SubscriptionService {
    struct Subscription {
        bool isActive;
        uint256 tier;
        uint256 expirationDate;
    }

    struct Comic {
        uint256 id;
        string title;
        string description;
        uint256 price;
    }

    mapping(address => Subscription) public subscriptions;
    mapping(address => mapping(uint256 => bool)) public purchasedComics;
    Comic[] public comics;

    uint256 public basicFee = 0.00001 ether;
    uint256 public premiumFee = 0.00005 ether;
    uint256 public subscriptionDuration = 30 days;

    constructor() {
        comics.push(Comic(0, "Comic One", "The first epic comic.", 0.1 ether));
        comics.push(Comic(1, "Comic Two", "A thrilling sequel.", 0.15 ether));
        comics.push(Comic(2, "Comic Three", "A fantastic adventure.", 0.2 ether));
        comics.push(Comic(3, "Comic Four", "An unforgettable tale.", 0.25 ether));
        comics.push(Comic(4, "Comic Five", "A legendary story.", 0.3 ether));
    }

    function subscribe(uint256 tier) external payable {
        require(tier == 0 || tier == 1, "Invalid tier");
        uint256 fee = (tier == 0) ? basicFee : premiumFee;
        require(msg.value == fee, "Incorrect fee sent");

        subscriptions[msg.sender] = Subscription({
            isActive: true,
            tier: tier,
            expirationDate: block.timestamp + subscriptionDuration
        });
    }

    function upgradeToPremium() external payable {
    Subscription storage sub = subscriptions[msg.sender];
    require(sub.isActive, "No active subscription to upgrade");
    require(sub.tier == 0, "Already on Premium or invalid tier");
    require(msg.value == (premiumFee - basicFee), "Incorrect fee sent for upgrade");

    // Upgrade the subscription
    sub.tier = 1;
    sub.expirationDate = block.timestamp + subscriptionDuration;
}


    function renewSubscription() external payable {
        Subscription storage sub = subscriptions[msg.sender];
        require(sub.isActive, "No active subscription to renew");
        
        uint256 fee = (sub.tier == 0) ? basicFee : premiumFee;
        require(msg.value == fee, "Incorrect fee sent");

        sub.expirationDate = block.timestamp + subscriptionDuration;
    }

    function purchaseComic(uint256 comicId) external payable {
        require(comicId < comics.length, "Comic does not exist");
        require(msg.value == comics[comicId].price, "Incorrect price sent");

        purchasedComics[msg.sender][comicId] = true;
    }

    function canAccessComic(address user, uint256 comicId) external view returns (bool) {
    require(comicId < comics.length, "Comic does not exist");

    Subscription memory sub = subscriptions[user];

    // Check if the comic was purchased
    if (purchasedComics[user][comicId]) {
        return true;
    }

    // Check if the user is subscribed
    if (sub.isActive && sub.expirationDate > block.timestamp) {
        if (sub.tier == 0 && comicId < 3) {
            // Basic tier: access to first three comics
            return true;
        } else if (sub.tier == 1) {
            // Premium tier: access to all comics
            return true;
        }
    }

    return false;
}


}
