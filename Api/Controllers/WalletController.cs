// <copyright file="WalletController.cs" company="Anton Hirov - Private entrepreneur">
// Copyright (c) Anton Hirov - Private entrepreneur. All rights reserved.
// </copyright>

namespace ElectronicLedger.Api.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    public class WalletController : BaseController
    {
        [HttpGet("{id}")]
        public string GetWallet(string id)
        {
            return $"wallet {id}";
        }

        [HttpGet]
        public string GetWallets()
        {
            return "wallets";
        }

        [HttpPost]
        public void CreateWallet()
        {
            // TODO!!!
        }

        [HttpDelete]
        public void DeleteWallet()
        {
            // TODO!!!
        }
    }
}
