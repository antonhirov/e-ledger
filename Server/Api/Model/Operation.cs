// <copyright file="Operation.cs" company="Anton Hirov - Private entrepreneur">
// Copyright (c) Anton Hirov - Private entrepreneur. All rights reserved.
// </copyright>

namespace ElectronicLedger.Api.Model
{
    internal sealed class Operation
    {
        public Amount Amount { get; set; }

        public DateTime DateTime { get; set; }

        public Category Category { get; set; }

        public string Desciption { get; set; }
    }
}
