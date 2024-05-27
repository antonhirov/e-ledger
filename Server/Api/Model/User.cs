// <copyright file="User.cs" company="Anton Hirov - Private entrepreneur">
// Copyright (c) Anton Hirov - Private entrepreneur. All rights reserved.
// </copyright>

namespace ElectronicLedger.Api.Model
{
    internal sealed class User
    {
        public string Name { get; set; }

        public string Password { get; set; }

        public List<Wallet> Wallets { get; set; }
    }
}
