// <copyright file="Amount.cs" company="Anton Hirov - Private entrepreneur">
// Copyright (c) Anton Hirov - Private entrepreneur. All rights reserved.
// </copyright>

namespace ElectronicLedger.Api.Model
{
    internal struct Amount
    {
        private readonly bool isNegative;
        private readonly uint banknotes;
        private readonly byte coins;

        public Amount()
        {
            this.isNegative = false;
            this.banknotes = 0;
            this.coins = 0;
        }

        public Amount(uint banknotes)
        {
            this.isNegative = false;
            this.banknotes = banknotes;
            this.coins = 0;
        }

        public Amount(bool isNegative, uint banknotes)
        {
            this.isNegative = isNegative;
            this.banknotes = banknotes;
            this.coins = 0;
        }

        public Amount(uint banknotes, byte coins)
        {
            this.isNegative = false;
            this.banknotes = banknotes;
            this.coins = coins;
        }

        public Amount(bool isNegative, uint banknotes, byte coins)
        {
            this.isNegative = isNegative;
            this.banknotes = banknotes;
            this.coins = coins;
        }

        public override string ToString()
        {
            string sign = this.isNegative ? "-" : string.Empty;
            return $"{sign}{this.banknotes}.{this.coins}";
        }
    }
}
