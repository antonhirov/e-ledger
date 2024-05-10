// <copyright file="Wallet.cs" company="Anton Hirov - Private entrepreneur">
// Copyright (c) Anton Hirov - Private entrepreneur. All rights reserved.
// </copyright>

namespace ElectronicLedger.Api.Model
{
    using ElectronicLedger.Api.Model.Enums;

    internal sealed class Wallet
    {
        public string Name { get; set; }

        public WalletType Type { get; set; }

        public Amount Amount { get; set; }
    }
}
